import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserContextType {
  userName: string;
  setUserName: (name: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_NAME_KEY = '@expense_tracker_user_name';

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserNameState] = useState<string>('');

  useEffect(() => {
    // Load saved user name from AsyncStorage
    const loadUserName = async () => {
      try {
        const savedName = await AsyncStorage.getItem(USER_NAME_KEY);
        if (savedName) {
          setUserNameState(savedName);
        } else {
          // Set default name if none is found
          setUserNameState('Hamza');
        }
      } catch (error) {
        console.error('Failed to load user name:', error);
        // Set default name on error
        setUserNameState('You Mysterious Stranger');
      }
    };

    loadUserName();
  }, []);

  const setUserName = async (name: string) => {
    try {
      await AsyncStorage.setItem(USER_NAME_KEY, name);
      setUserNameState(name);
    } catch (error) {
      console.error('Failed to save user name:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};