import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: metrics.basePadding,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: metrics.baseRadius,
    marginBottom: metrics.baseMargin,
  },

  avatar: {
    width: 50,
    height: 50,
  },

  infoContainer: {
    flex: 1,
    marginHorizontal: metrics.baseMargin * 2,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.black,
    marginBottom: metrics.baseMargin / 2,
  },

  organization: {
    fontStyle: 'italic',
    fontSize: 14,
    color: colors.regular,
  },

  icon: {
    color: colors.regular,
    fontSize: 16,
  },

  loading: {
    marginTop: metrics.baseMargin * 2,
  },
});

export default styles;
