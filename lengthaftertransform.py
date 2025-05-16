class Solution:
    def lengthAfterTransformations(self, s: str, t: int) -> int:
        initial_length = len(s)
        for char in s:
            letter_number = ord(char) - ord('a') + 1
            additional_length = letter_number % 26
            initial_length = initial_length + additional_length
            
        return initial_length
    
    lengthAfterTransformations("abcyyy", 3)