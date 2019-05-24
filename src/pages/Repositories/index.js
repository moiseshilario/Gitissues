import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  View, TextInput, FlatList, ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import RepositoryItem from './RepositoryItem';

import api from '~/services/api';

import styles from './styles';

const Repositories = ({ navigation }) => {
  const [repos, setRepos] = useState([]);
  const [repoInput, setRepoInput] = useState('');
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefresing] = useState(false);

  useEffect(() => {
    getRepositories();
  }, []);

  const getRepositories = async () => {
    setLoadingRepos(true);
    const repositories = await AsyncStorage.getItem('@GitIssue:repositories');
    setRepos(JSON.parse(repositories) || []);
    setLoadingRepos(false);
  };

  const loadRepos = async () => {
    setRefresing(true);
    const repositories = await Promise.all(
      repos.map(async (repo) => {
        const { data } = await api.get(`/repos/${repo.organization}/${repo.name}`);
        return {
          id: data.id,
          name: data.name,
          organization: data.owner.login,
          avatar: data.owner.avatar_url,
        };
      }),
    );
    setRepos(repositories);
    await AsyncStorage.setItem('@GitIssue:repositories', JSON.stringify(repositories));
    setRefresing(false);
  };

  const addRepo = async () => {
    setLoading(true);
    const { data } = await api.get(`/repos/${repoInput}`);
    const repository = {
      id: data.id,
      name: data.name,
      organization: data.owner.login,
      avatar: data.owner.avatar_url,
    };
    const repositories = [...repos, repository];
    await AsyncStorage.setItem('@GitIssue:repositories', JSON.stringify(repositories));
    setRepos(repositories);
    setLoading(false);
  };

  const onPressRepo = (repo) => {
    navigation.navigate('Issues', { repository: repo });
  };

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => <RepositoryItem repo={item} onPress={onPressRepo} />;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={repoInput}
            onChangeText={text => setRepoInput(text)}
            placeholder="Add new repository"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Icon onPress={() => addRepo()} name="plus" size={26} />
          )}
        </View>
        <View style={styles.separator} />
      </View>
      {loadingRepos ? (
        <ActivityIndicator />
      ) : (
        repos.length > 0 && (
          <FlatList
            refreshing={refreshing}
            onRefresh={loadRepos}
            data={repos}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />
        )
      )}
    </View>
  );
};

Repositories.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Repositories.navigationOptions = {
  title: 'GitIssues',
};

export default Repositories;
