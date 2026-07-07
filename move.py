import os
import shutil

source_dir = 'OnePG'
target_dir = '.'

for filename in os.listdir(source_dir):
    source_file = os.path.join(source_dir, filename)
    target_file = os.path.join(target_dir, filename)
    shutil.move(source_file, target_file)

os.rmdir(source_dir)
print("Files moved successfully!")
