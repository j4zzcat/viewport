import logging
import subprocess
import sys
import time
from multiprocessing import freeze_support

from backend.cmdsrv import Command
from backend.procsrv import SimpleProcessServer
from context import GlobalFactory

from colorist import BgColorHSL

def print_ansi256_color_gamut():
    # Print system colors (0-15)
    print("System colors:")
    for color_code in range(16):
        print(f'\033[38;5;{color_code}m {color_code:3} \033[0m', end=' ')
    print("\n")

    # Print 6x6x6 color cube (16-231)
    print("Color cube (16-231):")
    for g in range(6):
        for r in range(6):
            for b in range(6):
                # Convert the RGB coordinates to a single code
                color_code = 16 + 36 * r + 6 * g + b
                print(f'\033[38;5;{color_code}m{color_code:3}\033[0m', end=' ')
            print(" ", end='')  # Slightly wider space between groups
        print("\n")
    print("\n")

    # Print grayscale colors (232-255)
    print("Grayscale colors:")
    for color_code in range(232, 256):
        print(f'\033[38;5;{color_code}m {color_code:3} \033[0m', end=' ')
        if (color_code - 231) % 8 == 0:
            print()  # Newline every 8 colors for readability

if __name__ == "__main__":
    print_ansi256_color_gamut()
