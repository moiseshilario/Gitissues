import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  View, FlatList, Linking, ActivityIndicator,
} from 'react-native';

import IssueItem from './IssueItem';

import api from '~/services/api';

import styles from './styles';

const Issues = ({ navigation }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const repo = navigation.getParam('repository');

  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    const { data } = await api.get(`/repositories/${repo.id}/issues`);
    setIssues(data);
    setLoading(false);
  };

  const onPressIssue = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.tron.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  const onRefreshIssues = () => {
    setRefreshing(true);
    getIssues();
    setRefreshing(false);
  };

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => <IssueItem issue={item} onPress={onPressIssue} />;

  return (
    <View styles={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        issues.length > 0 && (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefreshIssues}
            contentContainerStyle={styles.listContainer}
            data={issues}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
          />
        )
      )}
    </View>
  );
};

Issues.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

Issues.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.repository.name,
});

export default Issues;
