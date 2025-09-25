import spacy
from gensim.models import Word2Vec

en_europarl_text = 'D:/europarl/europarl-v7.es-en.en'
sp_europarl_text = 'D:/europarl/europarl-v7.es-en.es'

en_sub_text = 'D:/OpenSubtitles/OpenSubtitles.en-es.en'
sp_sub_text = 'D:/OpenSubtitles/OpenSubtitles.en-es.es'

nlp_en = spacy.load("en_core_web_sm")
nlp_sp = spacy.load("es_core_news_sm")


# lemmatize batches of sentences
def lemmatize_sp_lines(sentences, batch_size=1000):
    lemmatized = []
    for doc in nlp_sp.pipe(sentences, batch_size=batch_size):
        lemmatized.append([token.lemma_.lower() for token in doc if token.is_alpha])
    return lemmatized


def lemmatize_en_lines(sentences, batch_size=1000):
    lemmatized = []
    for doc in nlp_sp.pipe(sentences, batch_size=batch_size):
        lemmatized.append([token.lemma_.lower() for token in doc if token.is_alpha])
    return lemmatized


def train_models(num_lines):
    print("training models...")
    print("training models on europarl text...")

    en_sentences = []
    sp_sentences = []

    with open(sp_europarl_text, encoding="utf-8") as sp_f:
        print("processing spanish europarl...")
        for i, line in enumerate(sp_f):
            if num_lines and i >= num_lines:
                break
            sp_sentences.append(line.strip())

    with open(sp_sub_text, encoding="utf-8") as sp_f:
        print("processing spanish open subtitles...")
        for i, line in enumerate(sp_f):
            if num_lines and i >= num_lines:
                break
            sp_sentences.append(line.strip())

    print("lemmatizing spanish sentences...")
    sp_sentences = lemmatize_sp_lines(sp_sentences)

    with open(en_europarl_text, encoding="utf-8") as en_f:
        print("processing english europarl...")
        for i, line in enumerate(en_f):
            if num_lines and i >= num_lines:
                break
            en_sentences.append(line.strip())

    with open(en_sub_text, encoding="utf-8") as en_f:
        print("processing english open subtitles...")
        for i, line in enumerate(en_f):
            if num_lines and i >= num_lines:
                break
            en_sentences.append(line.strip())

    print("lemmatizing english sentences...")
    en_sentences = lemmatize_en_lines(en_sentences)


    sp_model = Word2Vec(sp_sentences, vector_size=200, window=5, min_count=4, workers=4)
    en_model = Word2Vec(en_sentences, vector_size=200, window=5, min_count=4, workers=4)

    print("english vocab length:", len(en_model.wv))  # number of words in English model
    print("spanish vocab length:", len(sp_model.wv))  # number of words in Spanish model

    sp_model.save("models/sp_model.model")
    en_model.save("models/en_model.model")


train_models(500000)