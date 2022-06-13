import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import moment from "moment";
import logo from "../../../../../images/logo.png"

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    fontFamily: 'Helvetica'
  },
  section: {
    margin: 30,
    padding: 10,
    flexGrow: 1
  },
  image: {
    height: 200,
    width: 150
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12
  },
  vote: {
    display: "flex",
    flexDirection: "row"
  },
  overviewContainer: {
    minHeight: 110
  },
  lang: {
    fontSize: 8,
    fontWeight: 700
  },
  text: {
    fontSize: 12
  },
  title: {
    fontSize: 18
  },
  logo: {
    width: 200,
    marginBottom: 30
    // marginLeft: 'auto',
    // marginRight: 'auto'
  }
});

export function InformePdf(props) {

  console.log("pdf props", props.data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
          <View style={styles.section}>

            <Image style={styles.logo} src={logo} />

            <Text style={{ ...styles.title,  marginBottom: 30, fontSize: 18, fontFamily: "Helvetica-Bold" }}>
              Informe médico
            </Text>

            {props.data !== null &&
                <View>

                    <View style={{marginBottom: 30,  flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }}>
                      <View>
                        <Text style={{ ...styles.text, fontFamily: "Helvetica-Bold" }}>
                          ¿Se aplicaron medicamentos?
                        </Text>
                        <Text style={{ ...styles.text, marginLeft: 3 }}>
                          {props.data.withMedicine ? "si" : "no"}
                        </Text>
                      </View>
                      
                      <View>
                        <Text style={{ ...styles.text, fontFamily: "Helvetica-Bold", marginLeft: 15 }}>
                          ¿Requiere exámenes médicos?
                        </Text>
                        <Text style={{ ...styles.text, marginLeft: 3 }}>
                          {props.data.withExams ? "si" : "no"}
                        </Text>
                      </View>
                  </View>

                  <Text style={{ ...styles.text, marginBottom: 5, fontFamily: "Helvetica-Bold" }}>
                    Descripcion:
                  </Text>
                  <Text style={{ ...styles.text,  marginBottom: 30}}>
                    {props.data.description}
                  </Text>

                  <Text style={{ ...styles.text, marginBottom: 5, fontFamily: "Helvetica-Bold" }}>
                    Otros examenes:
                  </Text>
                  <Text style={{ ...styles.text}}>
                    {props.data.otherExams}
                  </Text>

              </View>
            }
            
          </View>
      </Page>

      {props.data.dosage !== "" && props.data.dosage !== null &&
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>

              <Image style={styles.logo} src={logo} />

              <Text style={{ ...styles.title,  marginBottom: 30, fontSize: 18, fontFamily: "Helvetica-Bold" }}>
                Informe médico
              </Text>

              {props.data !== null &&
                  <View>

                    <Text style={{ ...styles.text, marginBottom: 15, fontFamily: "Helvetica-Bold" }}>
                      Posología:
                    </Text>
                    <Text style={{ ...styles.text,  marginBottom: 15}}>
                      {props.data.dosage}
                    </Text>

                </View>
              }
              
            </View>
        </Page>
      }
    </Document>
  );
}
