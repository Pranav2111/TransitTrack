import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const Dropdown = ({options, placeholder, onOptionSelected}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef(null);

  const filterOptions = text => {
    setSearchText(text);
    const filtered = options.filter(option =>
      option.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredOptions(filtered);
    setShowOptions(filtered.length > 0);
  };

  const onOptionPress = option => {
    setSearchText(option);
    onOptionSelected(option);
    setShowOptions(false);
  };

  const handleBlur = () => {
    // Add slight delay to allow option selection
    setTimeout(() => {
      if (!inputRef.current.isFocused()) {
        setShowOptions(false);
      }
    }, 100);
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={searchText}
        onFocus={() => setShowOptions(filteredOptions.length > 0)}
        onBlur={handleBlur}
        onChangeText={filterOptions}
        placeholder={placeholder}
      />
      {showOptions && (
        <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
          <View style={styles.dropdownContainer}>
            <FlatList
              data={filteredOptions}
              style={styles.dropdown}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => onOptionPress(item)}
                  style={styles.option}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    height: 45,
    color: '#374151',
    backgroundColor: '#F9FAFB',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    zIndex: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    maxHeight: 150,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '97%',
    alignSelf: 'center',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
  },
});

export default Dropdown;
