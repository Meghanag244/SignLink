import pickle
import json
import numpy as np

try:
    with open("Code/hist", "rb") as f:
        hist_data = pickle.load(f)
    
    # Convert numpy array to a list for JSON serialization
    if isinstance(hist_data, np.ndarray):
        hist_data = hist_data.tolist()

    with open("hist_data.json", "w") as json_file:
        json.dump(hist_data, json_file)
    print("hist_data.json created successfully.")
except Exception as e:
    print(f"Error: {e}") 