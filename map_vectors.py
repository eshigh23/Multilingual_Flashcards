import numpy as np
from scipy.linalg import orthogonal_procrustes
from models import en_model, sp_model
from sklearn.metrics.pairwise import cosine_similarity

# seed_dictionary = {
#     "dog": "perro",
#     "cat": "gato",
#     "house": "casa",
#     "water": "agua",
#     "day": "día",
#     "night": "noche",
#     "man": "hombre",
#     "woman": "mujer",
#     "child": "niño",
#     "food": "comida",
#     "book": "libro",
#     "school": "escuela",
#     "car": "coche",
#     "street": "calle",
#     "city": "ciudad",
#     "sun": "sol",
#     "moon": "luna",
#     "tree": "árbol",
#     "friend": "amigo",
#     "family": "familia",
# }

# print("EN vocab sample:", list(en_model.wv.index_to_key[:50]))
# print("ES vocab sample:", list(sp_model.wv.index_to_key[:50]))

# collect aligned vectors for seed words
def create_matrix():
    en_vectors, sp_vectors = [], []

    for en_word, sp_word in seed_dictionary.items():
        if en_word in en_model.wv and sp_word in sp_model.wv:
            en_vectors.append(en_model.wv[en_word])
            sp_vectors.append(sp_model.wv[sp_word])

    en_matrix = np.array(en_vectors)
    sp_matrix = np.array(sp_vectors)
    W, _ = orthogonal_procrustes(sp_matrix, en_matrix)
    return W


def create_matrix_2():
    en_vectors, sp_vectors = [], []
    with open("seed_dict.txt", encoding="utf-8") as f:
        for line in f:
            parts = line.strip().split("\t")
            if len(parts) < 3:
                continue
            en_word, sp_word = parts[0], parts[1]
            # print("english word:", en_word, "spanish word:", sp_word)

            if en_word in en_model.wv and sp_word in sp_model.wv:
                en_vectors.append(en_model.wv[en_word])
                sp_vectors.append(sp_model.wv[sp_word])

    if not en_vectors or not sp_vectors:
        raise ValueError("No valid seed pairs found in vocab!")

    print(f"Seed pairs used: {len(en_vectors)}")

    en_matrix = np.array(en_vectors)
    sp_matrix = np.array(sp_vectors)
    W, _ = orthogonal_procrustes(sp_matrix, en_matrix)

    # print("EN vectors:", en_vectors)
    # print("sp vectors:", sp_vectors)

    return W
                

W = create_matrix_2()


# learn linear transformation



def translate_sp_to_en(word, topn=5):
    if word not in sp_model.wv:
        return []
    sp_vec = sp_model.wv[word]
    mapped = sp_vec @ W
    sims = cosine_similarity([mapped], en_model.wv.vectors)[0]
    best_idx = sims.argsort()[::-1][:topn]
    return [en_model.wv.index_to_key[i] for i in best_idx]

print("política:", translate_sp_to_en("política"))
print("servicio:", translate_sp_to_en("servicio"))
print("pesca:",translate_sp_to_en("pesca"))
print("carta:",translate_sp_to_en("carta"))
print("casa:", translate_sp_to_en("casa"))
print("persona:", translate_sp_to_en("persona"))
print("bueno:", translate_sp_to_en("bueno"))
print("fecha:", translate_sp_to_en("fecha"))
print("propiedad:", translate_sp_to_en("propiedad"))
print("junio:", translate_sp_to_en("junio"))
print("firmar:", translate_sp_to_en("firmar"))
print("feliz:", translate_sp_to_en("feliz"))
print("amor:", translate_sp_to_en("amor"))
print("trabajo:", translate_sp_to_en("trabajo"))     # work, job, task, labor
print("camino:", translate_sp_to_en("camino"))       # road, path, way, journey
print("pueblo:", translate_sp_to_en("pueblo"))       # town, people, village
print("juego:", translate_sp_to_en("juego"))         # game, play, match
print("derecho:", translate_sp_to_en("derecho"))     # right, law, straight
print("tiempo:", translate_sp_to_en("tiempo"))       # time, weather, era
print("historia:", translate_sp_to_en("historia"))   # history, story, tale
print("luz:", translate_sp_to_en("luz"))             # light, lamp, brightness
print("mesa:", translate_sp_to_en("mesa"))           # table, desk, board
print("cambio:", translate_sp_to_en("cambio"))           # hand, handwriting, turn


# # print(translate_sp_to_en("casa"))
# # print(en_model.wv['house'].shape)  
# # print(list(en_model.wv.index_to_key[:200]))  # top 10 words in vocabulary
# print(list(sp_model.wv.index_to_key[:200]))  # top 10 words in vocabulary
# print(en_model.wv.similarity('house', 'farm'))  # should be a positive float, closer means more similar


