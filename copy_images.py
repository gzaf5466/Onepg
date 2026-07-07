import os
import shutil

images = [
    "/home/mohd-ghazi-zafar/.gemini/antigravity/brain/7304c717-4875-4d7b-bb2b-5c71dbc1e298/fintech_dashboard_ui_1783167116189.png",
    "/home/mohd-ghazi-zafar/.gemini/antigravity/brain/7304c717-4875-4d7b-bb2b-5c71dbc1e298/cross_platform_mockup_1783167127363.png",
    "/home/mohd-ghazi-zafar/.gemini/antigravity/brain/7304c717-4875-4d7b-bb2b-5c71dbc1e298/routing_network_abstract_1783167137356.png"
]

dest_names = [
    "dashboard.png",
    "cross_platform.png",
    "routing_abstract.png"
]

public_dir = "/mnt/Projects/Ghazi's Development/Web-Projects/OnePg pvt ltd/OnePG.in/public"

for src, dest_name in zip(images, dest_names):
    if os.path.exists(src):
        shutil.copy(src, os.path.join(public_dir, dest_name))
        print(f"Copied {dest_name}")
    else:
        print(f"Source not found: {src}")
