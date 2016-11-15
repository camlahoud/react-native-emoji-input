import React, { PropTypes, Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Keyboard, ListView, Platform } from 'react-native';
import getEmojiData from './data';

import ScrollableTabView from 'react-native-scrollable-tab-view';

class EmojiSelector extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            visible: props.defaultVisible || false,
            height: (props.defaultVisible || false) ? props.containerHeight : 0,
            emoji: []
        };
    }
    
    componentWillMount() {
        this.setState({
            emoji: getEmojiData()
        })
    }
    
    render() {
        const { headerStyle, containerBackgroundColor, emojiSize, onPick, tabBorderColor } = this.props;
        return (
            <View style={[{height: this.state.height}]}>
                <ScrollableTabView
                    tabBarUnderlineStyle={{
                        backgroundColor: this.props.tabBorderColor
                    }}
                    tabBarTextStyle={styles.tabBarText}
                    style={styles.picker}
                    >
                    {this.state.emoji.map((category, idx) => (
                        <EmojiCategory
                            key={idx}
                            tabLabel={category.items[0]}
                            headerStyle={headerStyle}
                            emojiSize={emojiSize}
                            name={category.category}
                            items={category.items}
                            onPick={this.onPress.bind(this)}
                        />
                    ))}
                </ScrollableTabView>
            </View>
        );
    }
    
    onPress(em) {
        if (this.props.onPick) {
            this.props.onPick(em);
        } else if (this.onPick) {
            this.onPick(em);
        }
    }
    
    show() {
        this.setState({visible: true, height: this.props.containerHeight});
    }
    
    hide() {
        this.setState({visible: false, height: 0});
    }
}

EmojiSelector.propTypes = {
    onPick: PropTypes.func,
    headerStyle: PropTypes.object,
    containerHeight: PropTypes.number.isRequired,
    containerBackgroundColor: PropTypes.string.isRequired,
    emojiSize: PropTypes.number.isRequired,
};

EmojiSelector.defaultProps = {
    containerHeight: 240,
    containerBackgroundColor: 'rgba(0, 0, 0, 0.1)',
    tabBorderColor: "#09837d",
    emojiSize: 40,
};

class EmojiCategory extends Component {
    constructor(props) {
        super(props);
        
        this.state={};
    }
    
    componentDidMount() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.props.items)
        });
    }
    render() {
        if (!this.state.dataSource) {
            return null;
        }
        const { emojiSize, name, items, onPick } = this.props;
        return (
            <View style={styles.categoryTab}>
                <ListView contentContainerStyle={styles.categoryItems}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    initialListSize={1000}
                />
            </View>
        );
    }
    
    _renderRow(item) {
        var size = this.props.emojiSize;
        // const fontSize = Platform.OS == 'android' ? size / 5 * 3 : size / 4 * 3;
        const fontSize = Platform.OS == 'android' ? size / 4 * 3 : size / 4 * 3;
        const width = Platform.OS == 'android' ? size + 8 : size;
        return (
            <TouchableOpacity style={{ flex: 0, height: size, width }} onPress={() => this.props.onPick(item)}>
                <View style={{ flex: 0, height: size, width, justifyContent: 'center' }}>
                    <Text style={{ flex: 0, fontSize, paddingBottom: 2, color: 'black' }}>
                        {item}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = {
    picker: {
        // flex: 1,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    categoryTab: {
        flex: 1,
        paddingHorizontal: 5,
        justifyContent: 'center'
        // paddingLeft: Platform.OS=='android' ? 20 : 5,
        // paddingTop: 42,
    },
    categoryItems: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tabBarText: {
        fontSize: Platform.OS == 'android' ? 26 : 24,
    }
};

export default EmojiSelector;
