import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const RepositoryItem = ({ repo, onPress }) => (
  <TouchableOpacity onPress={() => onPress(repo)}>
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: repo.avatar }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{repo.name}</Text>
        <Text style={styles.organization}>{repo.organization}</Text>
      </View>
      <Icon style={styles.icon} name="chevron-right" />
    </View>
  </TouchableOpacity>
);

RepositoryItem.propTypes = {
  repo: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    organization: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default RepositoryItem;
