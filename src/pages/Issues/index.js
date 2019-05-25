import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  View, FlatList, Linking, ActivityIndicator,
} from 'react-native';

import { ButtonGroup } from 'react-native-elements';
import IssueItem from './IssueItem';

import api from '~/services/api';

import styles from './styles';

const Issues = ({ navigation }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('All');
  const [filteredIssues, setFilteredIssues] = useState([]);
  const repo = navigation.getParam('repository');
  const filters = ['All', 'Open', 'Closed'];

  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    const { data } = await api.get(`/repositories/${repo.id}/issues?state=all`);
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
    filterIssues();
    setRefreshing(false);
  };

  const filterIssues = async () => {
    // eslint-disable-next-line no-unused-expressions
    if (filter === 'All') {
      setFilteredIssues(issues);
    } else {
      const filtered = issues.filter(issue => issue.state === filter.toLowerCase());
      if (filtered.length) {
        setFilteredIssues(filtered);
      } else {
        setLoading(true);
        const { data } = await api.get(
          `/repositories/${repo.id}/issues?state=${filter.toLowerCase()}`,
        );
        setIssues([...issues, ...data]);
        setFilteredIssues(data);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    filterIssues();
  }, [filter, issues]);

  const onPressFilter = (selectedIndex) => {
    setFilter(filters[selectedIndex]);
  };

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => <IssueItem issue={item} onPress={onPressIssue} />;

  return (
    <View style={styles.container}>
      <ButtonGroup
        onPress={onPressFilter}
        selectedIndex={filters.findIndex(item => item === filter)}
        buttons={filters}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        issues.length > 0 && (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefreshIssues}
            contentContainerStyle={styles.listContainer}
            data={filteredIssues}
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
