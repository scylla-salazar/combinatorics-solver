import os
from flask import Flask, jsonify, request, redirect, url_for, session
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
from functools import wraps
from itertools import permutations
import math
from flask_cors import CORS

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)

#Enable CORS for all routes
CORS(app)

# Set a Flask secret key
app.secret_key = os.urandom(24)  # Generates a random 24-byte secret key

# Auth0 Configuration
oauth = OAuth(app)
auth0 = oauth.register(
    'auth0',
    client_id=os.getenv('AUTH0_CLIENT_ID'),
    client_secret=os.getenv('AUTH0_CLIENT_SECRET'),
    api_base_url=os.getenv('AUTH0_DOMAIN'),
    access_token_url=os.getenv('AUTH0_DOMAIN') + '/oauth/token',
    authorize_url=os.getenv('AUTH0_DOMAIN') + '/authorize',
    client_kwargs={
        'scope': 'openid profile email',
    },
)

# Login Route
@app.route('/login')
def login():
    return auth0.authorize_redirect(redirect_uri=url_for('callback', _external=True))

# Callback Route
@app.route('/callback')
def callback():
    auth0.authorize_access_token()
    userinfo = auth0.get('userinfo').json()
    session['user'] = userinfo
    return jsonify(userinfo)

# Logout Route
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

# Auth Decorator to Protect Routes
def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user' not in session:
            return jsonify({"error": "Unauthorized access"}), 403
        return f(*args, **kwargs)
    return decorated

# Combinatorics Problem Routes

# Traveling Salesman Problem (TSP)
@app.route('/tsp', methods=['POST'])
@requires_auth
def solve_tsp():
    cities = request.json.get('cities')
    if not cities:
        return jsonify({"error": "Cities data is missing"}), 400

    def calculate_distance(route):
        return sum(math.dist(cities[route[i]], cities[route[i + 1]]) for i in range(len(route) - 1)) + math.dist(cities[route[-1]], cities[route[0]])

    best_route = min(permutations(range(len(cities))), key=calculate_distance)
    return jsonify({"best_route": best_route})

# Knapsack Problem
@app.route('/knapsack', methods=['POST'])
@requires_auth
def solve_knapsack():
    items = request.json.get('items')
    capacity = request.json.get('capacity')
    
    if not items or capacity is None:
        return jsonify({"error": "Items or capacity data is missing"}), 400
    
    # Implementing the Knapsack problem using dynamic programming
    n = len(items)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if items[i - 1]['weight'] <= w:
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - items[i - 1]['weight']] + items[i - 1]['value'])
            else:
                dp[i][w] = dp[i - 1][w]
    
    return jsonify({"max_value": dp[n][capacity]})

# Graph Coloring Problem
@app.route('/graph_coloring', methods=['POST'])
@requires_auth
def solve_graph_coloring():
    graph = request.json.get('graph')
    
    if not graph:
        return jsonify({"error": "Graph data is missing"}), 400
    
    # Graph coloring using a greedy algorithm
    color_result = {}
    for node in graph:
        available_colors = set(range(len(graph)))
        for neighbor in graph[node]:
            if neighbor in color_result:
                available_colors.discard(color_result[neighbor])
        color_result[node] = min(available_colors)
    
    return jsonify({"color_assignment": color_result})

# Hamiltonian Cycle Problem
@app.route('/hamiltonian_cycle', methods=['POST'])
@requires_auth
def solve_hamiltonian_cycle():
    graph = request.json.get('graph')

    if not graph:
        return jsonify({"error": "Graph data is missing"}), 400

    # Hamiltonian cycle using a backtracking approach
    n = len(graph)
    path = [-1] * n

    def is_valid(v, pos):
        if graph[path[pos - 1]][v] == 0:
            return False
        if v in path:
            return False
        return True

    def hamiltonian_cycle(pos):
        if pos == n:
            return graph[path[pos - 1]][path[0]] == 1
        for v in range(1, n):
            if is_valid(v, pos):
                path[pos] = v
                if hamiltonian_cycle(pos + 1):
                    return True
                path[pos] = -1
        return False

    path[0] = 0
    if hamiltonian_cycle(1):
        return jsonify({"cycle": path + [0]})
    else:
        return jsonify({"message": "No Hamiltonian cycle found"})

# Bin Packing Problem
@app.route('/bin_packing', methods=['POST'])
@requires_auth
def solve_bin_packing():
    items = request.json.get('items')
    bin_capacity = request.json.get('bin_capacity')

    if not items or not bin_capacity:
        return jsonify({"error": "Items or bin capacity data is missing"}), 400

    # First-Fit Decreasing algorithm for bin packing
    items.sort(reverse=True)
    bins = []

    for item in items:
        placed = False
        for b in bins:
            if sum(b) + item <= bin_capacity:
                b.append(item)
                placed = True
                break
        if not placed:
            bins.append([item])

    return jsonify({"bins": bins})

# Partitions Problem
@app.route('/partitions', methods=['POST'])
@requires_auth
def solve_partitions():
    number = request.json.get('number')

    if number is None:
        return jsonify({"error": "Number data is missing"}), 400

    # Partition algorithm using dynamic programming
    partition_counts = [1] + [0] * number

    for i in range(1, number + 1):
        for j in range(i, number + 1):
            partition_counts[j] += partition_counts[j - i]

    return jsonify({"partition_count": partition_counts[number]})

if __name__ == '__main__':
    app.run(debug=True)

