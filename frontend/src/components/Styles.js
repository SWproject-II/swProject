import { StyleSheet } from "react";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  recipeContainer: {
    flex: 1,
    padding: 5,
  },
  titleContainer: {
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  recipetitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
    paddingLeft: 3,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#9299a9",
    paddingLeft: 3,
  },
  amountUnitContainer: {
    width: '25%',
  },
  amountUnitText: {
    fontSize: 14,
  },
  originalNameContainer: {
    width: '70%',
  },
  originalNameText: {
    fontSize: 14,
  },
  instructionText: {
    fontSize: 14,
    width: '100%',
    paddingLeft: 3,
    marginBottom: 3
  },
  recipeIcons: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 5,
  },
});

export default styles