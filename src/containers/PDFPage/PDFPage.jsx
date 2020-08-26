import React from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font
} from '@react-pdf/renderer';
import { connect } from 'react-redux';

Font.register({
  family: 'Roboto',
  src:
    'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf'
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    fontFamily: 'Roboto',
    orientation: 'portrait'
  },
  section1: {
    margin: 30,
    padding: 0,
    textAlign: 'center'
  },
  section2: {
    margin: 30,
    padding: 0,
    textAlign: 'left'
  }
});

const PDFPage = (props) => {
  const { value, rate, currentResult } = props;
  return (
    <PDFViewer>
      <Document>
        <Page size='A4' style={styles.page}>
          <View style={styles.section1}>
            <Text>Результат:</Text>
          </View>
          <View style={styles.section2}>
            <Text>{`Сумма вклада: ${value} руб.`}</Text>
            <Text>{`Процентная ставка: ${rate} %`}</Text>
            <Text>{`Начисленные проценты: ${currentResult} руб.`}</Text>
            <Text>{`Сумма вклада с процентами: ${value + currentResult} руб.`}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

function mapStateToProps(state) {
  return {
    value: state.sum.value,
    rate: state.results.rate,
    currentResult: state.results.currentResult
  };
}

export default connect(
  mapStateToProps
)(PDFPage);

PDFPage.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  currentResult: PropTypes.string,
  rate: PropTypes.number,
};
