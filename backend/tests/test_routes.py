def test_get_items(client):
    """Test GET /items endpoint"""
    response = client.get('/items')
    assert response.status_code == 200
    assert response.json == {
        "message": "List of items",
        "items": []
    }
