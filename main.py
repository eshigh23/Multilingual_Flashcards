import nltk
from nltk.corpus import wordnet as wn

# Make sure you have both datasets
nltk.download('wordnet')
nltk.download('omw-1.4')

# English synset for "dog"
dog = wn.synsets("dog", lang="eng")[0]
print("English:", dog.lemma_names("eng"))

# Spanish equivalents
print("Spanish:", dog.lemma_names("spa"))

# Japanese equivalents
print("Japanese:", dog.lemma_names("jpn"))