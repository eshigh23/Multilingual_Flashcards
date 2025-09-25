from collections import defaultdict, Counter
import spacy
from heapq import nlargest
import pickle


en_europarl_text = 'D:/europarl/europarl-v7.es-en.en'
sp_europarl_text = 'D:/europarl/europarl-v7.es-en.es'

en_sub_text = 'D:/OpenSubtitles/OpenSubtitles.en-es.en'
sp_sub_text = 'D:/OpenSubtitles/OpenSubtitles.en-es.es'

# load spaCy models
nlp_en = spacy.load("en_core_web_sm")
nlp_sp = spacy.load("es_core_news_sm")

cooc_dict = defaultdict(dict)


# lemmatize batches of sentences using spacy, include morphology
def lemmatize_sp_lines(sentences, batch_size=1000):
    lemmatized = []
    for doc in nlp_sp.pipe(sentences, batch_size=batch_size):
        sentence = []
        for token in doc:
            if token.is_alpha and not token.is_stop:
                lemma = token.lemma_.lower()
                pos = token.pos_
                gender = token.morph.get("Gender")
                gender = gender[0] if gender else None
                sentence.append((lemma, pos, gender))   # append each word's morph info to sentence array
        lemmatized.append(sentence)
    return lemmatized


# lemmatize batches of sentences using spacy, lemma only
def lemmatize_en_lines(sentences, batch_size=1000):
    lemmatized = []
    for doc in nlp_en.pipe(sentences, batch_size=batch_size):
        sentence = []
        for token in doc:
            if token.is_alpha and not token.is_stop:
                lemma = token.lemma_.lower()
                sentence.append(lemma)   # append english word 
        lemmatized.append(sentence)
    return lemmatized


def trim_dict(dict, k):
    for spa_word, eng_dict in cooc_dict.items():
        top_entries = nlargest(k, eng_dict.items(), key=lambda item: item[1][0])
        dict[spa_word] = top_entries

    print("trimmed dictionary!:")
    for k, v in cooc_dict.items():  
        print(k, ':', v, '\n')


# purpose: create seed dictionary by choosing the most common translation for each word
# format:
# intuition: for every english word, what spanish word is the most common?
def write_to_dict(_cooc_dict, output_path="spa_eng_dict.txt", min_count=60):
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

# purpose: create co-occurrence dictionary
# format: dict[spa][eng] = (count, POS, gender)
# intuition: associate every word in spa sentence with every word in eng sentence
def create_cooc_dictionary(en_file, sp_file, num_lines):
    print('creating cooc dictionary...')
    en_sentences = []
    sp_sentences = []

    print('collecting sentences from corpus...')
    with open(en_file, encoding="utf-8") as en_f, open(sp_file, encoding="utf-8") as sp_f:
        for i, (en_line, sp_line) in enumerate(zip(en_f, sp_f)):
            if i >= num_lines: break
            # collect sentences from corpus
            en_sentences.append(en_line.strip())    # strip white space
            sp_sentences.append(sp_line.strip())    # strip white space

    # batch-lemmatize lists of sentences
    print("lemmatizing english sentences...")
    en_sentences = lemmatize_en_lines(en_sentences)
    print("lemmatizing spanish sentences...")
    sp_sentences = lemmatize_sp_lines(sp_sentences)

    print('creating cooc dictionary...')
    # build dictionary 
    for en_sentence, sp_sentence in zip(en_sentences, sp_sentences):
        for _sp_word in sp_sentence:
            sp_word, sp_POS, sp_gender = _sp_word   # destructure tuple
            for en_word in en_sentence:
                if en_word in cooc_dict[sp_word]:
                    prev_count, _, _ = cooc_dict[sp_word][en_word]
                    cooc_dict[sp_word][en_word] = (prev_count + 1, sp_POS, sp_gender)
                else:
                    cooc_dict[sp_word][en_word] = (1, sp_POS, sp_gender)
    
    return cooc_dict


# create_cooc_dictionary(en_europarl_text, sp_europarl_text, 10000)
# create_cooc_dictionary(en_sub_text, sp_sub_text, 10000)

# trim_dict(cooc_dict, 5)

# with open('es_en_dict.pkl', "wb") as f:
#     pickle.dump(cooc_dict, f)


with open("es_en_dict.pkl", "rb") as f:
    sample_dict = pickle.load(f)

casa = (sample_dict["casa"])  # see the Spanish word "casa"
for eng_word, (count, pos, gender) in casa:
    print(f"English word: {eng_word}")
    print(f"Count: {count}, POS: {pos}, Gender: {gender}")
    print("---")






# write_to_dict(cooc_dict)