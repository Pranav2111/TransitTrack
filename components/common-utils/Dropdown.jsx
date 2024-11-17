import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const Dropdown = ({options, placeholder, onOptionSelected}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showModal, setShowModal] = useState(false);

  const inputRef = useRef(null);

  const filterOptions = text => {
    setSearchText(text);
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredOptions(filtered);
  };

  const onOptionPress = option => {
    setSearchText(option.label);
    onOptionSelected(option);
    setShowModal(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!inputRef.current.isFocused()) {
        setShowModal(false);
      }
    }, 100);
  };

  const clearSearch = () => {
    onOptionSelected(null);
    setSearchText('');
    setFilteredOptions(options);
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={searchText}
        onFocus={() => setShowModal(true)}
        onBlur={handleBlur}
        onChangeText={filterOptions}
        placeholder={placeholder}
        placeholderTextColor={'#aeb3bb'}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>×</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  value={searchText}
                  onChangeText={filterOptions}
                  placeholder={placeholder}
                  autoFocus
                />
                <FlatList
                  data={filteredOptions}
                  style={styles.dropdown}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => onOptionPress(item)}
                      style={styles.option}>
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    height: 40,
    color: '#75777a',
    backgroundColor: 'white',
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
    paddingHorizontal: 10,
  },
  clearButtonText: {
    fontSize: 18,
    color: '#8a8e94',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '95%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    top: 100,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    maxHeight: 250,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: 'center',
    width: '100%',
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
