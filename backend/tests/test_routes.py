import pytest
from unittest.mock import patch

def test_get_movies(client):
    """Test GET /movies endpoint"""
    mock_movies = [{
        'id': 1,
        'title': 'Test Movie',
        'overview': 'Test overview'
    }]
    
    with patch('backend.backend.services.tmdb_service.TMDBService.get_popular_movies', 
               return_value=mock_movies):
        response = client.get('/movies')
        
        assert response.status_code == 200
        assert response.json['message'] == "List of popular movies"
        assert response.json['movies'] == mock_movies
