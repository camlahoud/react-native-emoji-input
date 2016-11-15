# react-native-emoji-selector
This package provides 2 components: EmojiSelector and EmojiInput.

EmojiSelector can be used for general purpose, can be handled by a show/hide function, and a onPick callback.

EmojiInput generates a TextInput that is linked to the emoji selector like a keyboard. You can either add the EmojiSelector yourself if you need to in a specific location on page, and then pass the reference of the selector to the input (property: selector). Or you can leave this attribute empty and the selector will be automatically added right below the TextInput.
