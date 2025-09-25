# import spacy
# from collections import defaultdict
from gensim.models import Word2Vec
from collections import defaultdict, Counter
import spacy

# load spaCy models
# nlp_es = spacy.load("es_core_news_sm")
# nlp_en = spacy.load("en_core_web_sm")

# path to your ParaCrawl files
# en_europarl_text = "D:/paracrawl/ParaCrawl.en-es.en"
# sp_europarl_text = "D:/paracrawl/ParaCrawl.en-es.es"

en_europarl_text = 'D:/europarl/europarl-v7.es-en.en'
sp_europarl_text = 'D:/europarl/europarl-v7.es-en.es'

en_sub_text = 'D:/OpenSubtitles/OpenSubtitles.en-es.en'
sp_sub_text = 'D:/OpenSubtitles/OpenSubtitles.en-es.es'

nlp_en = spacy.load("en_core_web_sm")
nlp_sp = spacy.load("es_core_news_sm")


def clean_en_europarl_text(text):
    doc = nlp_en(text.strip())
    # return [token.lemma_.lower() for token in doc if token.is_alpha and not token.is_stop]
    cleaned_tokens = []
    for token in doc:
        # print(f"Token: '{token.text}', Lemma: '{token.lemma_}', is_alpha: {token.is_alpha}, is_stop: {token.is_stop}")
        if token.is_alpha and not token.is_stop:
            cleaned_tokens.append(token.lemma_.lower())
    return cleaned_tokens


def clean_sp_europarl_text(text):
    doc = nlp_sp(text.strip())
    # return [token.lemma_.lower() for token in doc if token.is_alpha and not token.is_stop]
    cleaned_tokens = []
    for token in doc:
        # print(f"Token: '{token.text}', Lemma: '{token.lemma_}', is_alpha: {token.is_alpha}, is_stop: {token.is_stop}")
        if token.is_alpha and not token.is_stop:
            cleaned_tokens.append(token.lemma_.lower())
    return cleaned_tokens


cooc_dict = defaultdict(Counter)

# purpose: create co-occurrence dictionary
# format: dict[en][spa] = Counter('key': count)
# intuition: associate every word in spa sentence with every word in eng sentence
def create_seed_dictionary():
    print('creating seed dictionary...')
    en_sentences = []
    sp_sentences = []
    print('processing europarl...')
    with open(en_europarl_text, encoding="utf-8") as en_f, open(sp_europarl_text, encoding="utf-8") as sp_f:
        for i, (en_line, sp_line) in enumerate(zip(en_f, sp_f)):
            if i >= 10000: break
            en_sentences.append(clean_en_europarl_text(en_line))
            sp_sentences.append(clean_sp_europarl_text(sp_line))

    for en_sentence, sp_sentence in zip(en_sentences, sp_sentences):
        for en_word in en_sentence:
            for sp_word in sp_sentence:
                cooc_dict[en_word][sp_word] += 1

    print('processing opensubtitles...')
    en_sentences.clear()
    sp_sentences.clear()
    with open(en_sub_text, encoding="utf-8") as en_f, open(sp_sub_text, encoding="utf-8") as sp_f:
        for i, (en_line, sp_line) in enumerate(zip(en_f, sp_f)):
            if i >= 50000: break
            en_sentences.append(clean_en_europarl_text(en_line))
            sp_sentences.append(clean_sp_europarl_text(sp_line))


    for en_sentence, sp_sentence in zip(en_sentences, sp_sentences):
        for en_word in en_sentence:
            for sp_word in sp_sentence:
                cooc_dict[en_word][sp_word] += 1
    
    # print("seed_dict:", seed_dict)
    # for i, (k,v) in enumerate(cooc_dict.items()):
    #     print("ENG", k, ":", v)
    #     print('----------------------------------')
    #     print('\n')
    #     if i >= 20:
    #         break

# purpose: create seed dictionary by choosing the most common translation for each word
# format:
# intuition: for every english word, what spanish word is the most common?
def write_to_seed_dict(_cooc_dict, output_path="seed_dict.txt", min_count=60):
    print(f'Beginning write to {output_path}...')
    with open(output_path, "w", encoding="utf-8") as f:
        for en_word, sp_counter in _cooc_dict.items():
            if not sp_counter: 
                continue
            # yields list of top element [('word': count)], unpack into a tuple with 0 index
            sp_word, count = sp_counter.most_common(1)[0]   # e.g. perro, 61
            if count >= min_count:
                f.write(f"{en_word}\t{sp_word}\t{count}\n") # e.g. dog \t perro \t 61
    print(f"Seed dictionary written to {output_path}")

create_seed_dictionary()
write_to_seed_dict(cooc_dict)



# text = "The quick brown fox jumps over the lazy dog and the cat."
# tokens = [t.lemma_.lower() for t in nlp_en(text) if t.is_alpha and not t.is_stop]
# print(tokens)
        

def train_models(num_lines):
    print("training models...")
    print("training models on europarl text...")
    sp_sentences = []
    with open(sp_europarl_text, encoding="utf-8") as sp_f:
        for i, line in enumerate(sp_f):
            if num_lines and i >= num_lines:
                break
            words = [w.lower() for w in line.strip().split() if w.isalpha()]
            sp_sentences.append(words)

    en_sentences = []
    with open(en_europarl_text, encoding="utf-8") as en_f:
        for i, line in enumerate(en_f):
            if num_lines and i >= num_lines:
                break
            words = [w.lower() for w in line.strip().split() if w.isalpha()]
            en_sentences.append(words)
    
    print("training models on opensubtitles text...")
    with open(sp_sub_text, encoding="utf-8") as sp_f:
        for i, line in enumerate(sp_f):
            if num_lines and i >= 4000000:
                break
            words = [w.lower() for w in line.strip().split() if w.isalpha()]
            sp_sentences.append(words)

    with open(en_sub_text, encoding="utf-8") as en_f:
        for i, line in enumerate(en_f):
            if num_lines and i >= 4000000:
                break
            words = [w.lower() for w in line.strip().split() if w.isalpha()]
            en_sentences.append(words)


    sp_model = Word2Vec(sp_sentences, vector_size=200, window=5, min_count=4, workers=4)
    en_model = Word2Vec(en_sentences, vector_size=200, window=5, min_count=4, workers=4)

    print("english vocab length:", len(en_model.wv))  # number of words in English model
    print("spanish vocab length:", len(sp_model.wv))  # number of words in Spanish model

    sp_model.save("models/sp_model.model")
    en_model.save("models/en_model.model")


train_models(750000)