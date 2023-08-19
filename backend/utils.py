import pickle


class SimilarMovies:
    def __init__(self):
        with open('models/similarity_matrix.pkl', 'rb') as f1:
            self.similarity_matrix = pickle.load(f1)

        with open('models/movie_id_to_matrix_similarity_idx.pkl', 'rb') as f2:
            self.movie_id_to_idx_series = pickle.load(f2)

    def get_recommendations_by_id(self, movie_id):
        # Get the index of the movie that matches the title
        idx = self.movie_id_to_idx_series[movie_id]

        # Get the pairwsie similarity scores of all movies with that movie
        similarity_scores = list(enumerate(self.similarity_matrix[idx]))

        # Sort the movies based on the similarity scores
        similarity_scores = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

        # Get the scores of the 10 most similar movies
        similarity_scores = similarity_scores[1:16]

        # Get the movie indices
        movies_idx = [i[0] for i in similarity_scores]

        # Return the top 10 most similar movies
        return self.movie_id_to_idx_series.iloc[movies_idx].index.tolist()
