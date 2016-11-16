# react-native-emoji-selector
This package provides 2 components: EmojiSelector and EmojiInput.

EmojiSelector can be used for general purpose, can be handled by a show/hide function, and a onPick callback.

EmojiInput generates a TextInput that is linked to the emoji selector like a keyboard. You can either add the EmojiSelector yourself if you need to in a specific location on page, and then pass the reference of the selector to the input (property: selector). Or you can leave this attribute empty and the selector will be automatically added right below the TextInput.

The EmojiSelector will by default track the latest used emojis and persists the state using AsyncStorage. This can be disabled by passing `history={false}` to the Selector component.

## Installation
This package is not yet on npm, you can install directly from github:
```
npm install --save https://github.com/camlahoud/react-native-emoji-input
```

## Usage
Standalone selector:
```
import { EmojiSelector } from '../react-native-emoji-input';
...

<EmojiSelector onPick={(em) => console.log(em)} />
```

Using the emoji input while manually adding the selector:
```
import { EmojiInput, EmojiSelector } from '../react-native-emoji-input';

...

<View>
    <View ... >
        <EmojiInput selector={this._selector} />
    </View>
    ...
    <View ...>
        <EmojiSelector ref={selector => this._selector = selector} />
    </View>
</View>
```