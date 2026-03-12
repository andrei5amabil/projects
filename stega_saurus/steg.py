def string_to_bits(data, eos_size):
    bits = []
    for char in data:
        bin_char = format(ord(char), '08b')
        for bit in bin_char:
            bits.append(int(bit))
    bits.extend([0]*8*eos_size) # eos delimiter 
    return bits 

def file_to_bits(file_path, eos_size):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = f.read()
        bits = []
        for char in data:
            bin_char = format(ord(char), '08b')
            for bit in bin_char:
                bits.append(int(bit))
        
        bits.extend([0]*8*eos_size) 
        return bits
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
        return None

from PIL import Image

def encode(img_path, hidden_bits):
    img = Image.open(img_path).convert('RGB')
    pixels = list(img.get_flattened_data())
    if( len(hidden_bits) > len(pixels)*3 ):
        print("Message is too long")
        return None
    
    en_pixels = []
    idx = 0
    len_bits = len(hidden_bits)

    for pixel in pixels:
        p = list(pixel)
        for i in range(3):
            if idx < len_bits:
                p[i] = ( p[i] & 0xFE ) | hidden_bits[idx]
                idx += 1
        en_pixels.append(tuple(p))
    return en_pixels, img.size

def save_en_img(en_pixels, size, out_path):
    en_img = Image.new('RGB', size)
    en_img.putdata(en_pixels)
    en_img.save(out_path)

def decode(img_path, eos_size):
    img = Image.open(img_path).convert('RGB')
    pixels = list(img.get_flattened_data())
    ext_bits = []
    idx = 0
    eos_counter = 0
    for pixel in pixels:
        p = list(pixel)
        for i in range(3):
            ext_bits.append(int( p[i] & 0x01 ))
            idx += 1
            if int( p[i] & 0x01 ) == 0:
                eos_counter += 1
                if eos_counter == 8 * eos_size:
                    return ext_bits, len(ext_bits)
            else:
                eos_counter = 0

def bits_to_string(ext_bits, ext_len, eos_size):
    string = ""
    for i in range(0, ext_len-eos_size, 8):
        byte = ext_bits[i:i+8]
        byte_str = "".join(map(str, byte))
        character = chr(int(byte_str, 2))
        string += character
    return string

# --- CONFIGURATION ---
TEXT_FILE = "secret_info.txt"
COVER_IMAGE = "./imgs/lepongebob.png"
OUTPUT_IMAGE = "./imgs/en_bob.png"
DECODED_FILE = "recovered_info.txt"
EOS_SIZE = 3  # Number of null bytes to signal End of Stream

# --- 1. ENCODING PHASE ---
print("--- Starting Encoding ---")
# Convert the file content to bits
secret_bits = file_to_bits(TEXT_FILE, EOS_SIZE)

if secret_bits:
    # Process the image and inject bits
    result = encode(COVER_IMAGE, secret_bits)
    
    if result:
        en_pixels, img_size = result
        # Save the result as a lossless PNG
        save_en_img(en_pixels, img_size, OUTPUT_IMAGE)
        print(f"File '{TEXT_FILE}' hidden inside '{OUTPUT_IMAGE}'")

# --- 2. DECODING PHASE ---
print("\n--- Starting Decoding ---")
# Extract bits from the modified image
ext_bits, ext_len = decode(OUTPUT_IMAGE, EOS_SIZE)

if ext_bits:
    # Convert bits back to readable text
    decoded_text = bits_to_string(ext_bits, ext_len, EOS_SIZE)
    
    # Save the decoded text to a new file
    with open(DECODED_FILE, 'w', encoding='utf-8') as f:
        f.write(decoded_text)
        
    print(f"Decoded message: {decoded_text}")
    print(f"Full text saved to: {DECODED_FILE}")