import urllib.request
import json

def post(url, data):
    req = urllib.request.Request(
        url, 
        data=json.dumps(data).encode('utf-8'), 
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    try:
        with urllib.request.urlopen(req) as f:
            print(f"Status: {f.status}")
            print(json.loads(f.read().decode('utf-8')))
    except Exception as e:
        print(f"Error: {e}")

print("=== INGEST ===")
post('http://127.0.0.1:8000/api/businesses/4efd842d-6abe-4fad-bebf-f1a01ca8675f/ingest/', {
  "content": "Deals Wheels is a vehicle dealership in Kerala. Services: Court fine clearance - we help clear court-issued vehicle fines. Normal fine clearance - clear standard traffic fines. Blacklist fine clearance - remove vehicle from blacklist. 50% fine reduction scheme - eligible fines can be reduced by half. Wedding car rentals - premium vehicles for weddings. Contact: +918111807449. Location: Kerala, India. We are open Monday to Saturday 9am to 6pm."
})

print("=== CHAT ===")
post('http://127.0.0.1:8000/api/chat/message/', {
  "business_id": "4efd842d-6abe-4fad-bebf-f1a01ca8675f",
  "session_id": "test-session-002",
  "message": "Do you offer wedding car rentals?",
  "source": "website"
})
