import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    Platform
} from 'react-native';
import EmojiSelector from './selector';

export default class EmojiInput extends Component {
    constructor(props) {
        super(props);
        
        if (props.selector) {
            this._selector = props.selector;
            this._selector.onPick = this.onSelect.bind(this);
        }
        this.state = {
            selector: false,
            value: props.value,
            selection: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            })
        }
    }
    render() {
        // return <TextInput {...this.props} />;
        const {containerStyle, emojiProps, height, ...textInputPropsAll} = this.props;
        const {style, ...textInputProps} = textInputPropsAll;
        return (
            <View style={containerStyle}>
                {this.state.selector ? this._renderShowKeyboard() : this._renderShowEmoticon()}
                <TextInput 
                    ref={input => this._input = input}
                    {...textInputProps}
                    style={[style, styles.input]} 
                    onChange={(e) => {
                        this.setState({
                            text: e.nativeEvent.text
                        });
                        if (this.props.onChange) {
                            this.props.onChange(e);
                        }
                    }}
                    onContentSizeChange={e => {
                        this.lastContentSize = e.nativeEvent.contentSize;
                    }}
                    onSelectionChange={e => {
                        this.setState({
                            selection: e.nativeEvent.selection
                        });
                    }}
                    value={this.state.value}
                />
                {this.props.selector?null:
                <EmojiSelector ref={selector => this._selector = selector} onPick={this.onSelect.bind(this)} />}
            </View>
        );
    }
    
    _renderShowEmoticon() {
        return (
            <TouchableOpacity onPress={this.showEmoticons.bind(this)} style={styles.toggler}>
                <Image source={require('../assets/ic_smile_w.png')} style={styles.toggleIcon} />
            </TouchableOpacity>
        );
    }
    
    _renderShowKeyboard() {
        return (
            <TouchableOpacity onPress={this.showKeyboard.bind(this)} style={styles.toggler}>
                <Image source={require('../assets/ic_keyboard_w.png')} style={styles.toggleIcon} />
            </TouchableOpacity>
        )
    }
    
    onSelect(em) {
        var value = this.state.value;
        if (this.state.selection === {}) {
            value += em;
        } else {
            var { start, end } = this.state.selection;
            if (start == end) {
                value = value.substr(0,start) + em + value.substr(start);
            } else {
                value = value.substr(0,start) + em + value.substr(end);
            }
        }
        this.setState({
            value
        })
        if (this.props.onChange) {
            this.props.onChange({
                nativeEvent: {
                    text: value,
                    contentSize: this.lastContentSize
                }
            })
        }
    }
    
    showEmoticons() {
        Keyboard.dismiss();
        this._selector.show();
        this.setState({
            selector: true
        })
    }
    
    showKeyboard() {
        this._selector.hide();
        this._input.focus();
        this.setState({
            selector: false
        })
    }
}

const styles = StyleSheet.create({
    input: {
        marginLeft: 40
    },
    toggler: {
        position: 'absolute',
        left: 5,
        top: Platform.select({
            ios: 0,
            android: 5
        }),
        width: 30,
        height: 30
    },
    toggleIcon: {
        tintColor: "#999",
        width: 30,
        height: 30,
        resizeMode: "contain"
    }
})