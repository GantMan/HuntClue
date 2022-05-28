/**
 * There are TWO programming errors in the code below stopping the password 
 * from happening.  Fix these two bugs to get the correct password.
 * 
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const URL = "https://www.random.org/integers/?num=1&min=1000&max=9999&col=1&base=10&format=html&rnd=new&format=plain"

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [password, setPassword] = useState(0)
  const isDarkMode = useColorScheme() === 'dark';

  function validateNumber (numberString) {
    const uniqueNums = [...new Set(x.split(''))]
    return uniqueNums.length > 1
  }

  function performOps(x) {
    for(let i = 0; i < 7; i++) {
      const a = x.split('').sort()
      const b = [...a].reverse()
      x = (~~b.join('') - ~~a.join('')).toString()
    }
    return x
  }

  async function grabNumber() {
    const response = await fetch(URL)
    const myNum = await response.text()
    return myNum
  } 

  async function calculatePassword() {
    const myNum = grabNumber()
    if (validateNumber(myNum)) {
      setPassword(performOps(myNum))
    } else {
      calculatePassword()
    }
  }

  useEffect(() => {
    calculatePassword()    
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="The password to the zip file is:">
            {password}
          </Section>

          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
