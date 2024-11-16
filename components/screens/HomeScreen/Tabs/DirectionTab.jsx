import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SearchBodySection from './DirectionTab/SearchBodySection';
import HeroSection from './DirectionTab/HeroSection';

const DirectionTab = () => {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <HeroSection
        formValues={formValues}
        isLoading={isLoading}
        setFormValues={setFormValues}
        setIsLoading={setIsLoading}
      />
      <SearchBodySection
        origin={formValues?.origin?.label}
        destination={formValues?.destination?.label}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default DirectionTab;
