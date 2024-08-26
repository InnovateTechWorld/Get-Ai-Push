import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const products = [
  {
    section: 'Popular Today',
    items: [
      {
        id: 1,
        name: 'Body Cleaner',
        brand: 'Grown Alchemist',
        
      },
      {
        id: 2,
        name: 'Light blue perfume',
        brand: 'Dolce & Gabanna',
        
      },
    ],
  },
  {
    section: 'Sponsored',
    items: [
      {
        id: 3,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
      {
        id: 4,
        name: 'Restorative Hair Mask',
        brand: 'Act+',
        
      },
      {
        id: 5,
        name: 'Potatoe Chips',
        brand: 'Pringles',
        
      },
      {
        id: 6,
        name: 'Light blue perfume',
        brand: 'Dolce & Gabanna',
        
      },
    ],
  },
  {
    section: 'Latest Additions',
    items: [
      {
        id: 7,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
      {
        id: 8,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
      {
        id: 9,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
      {
        id: 10,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
    ],
  },
  {
    section: 'African Made',
    items: [
      {
        id: 11,
        name: 'Face cleanser',
        brand: 'Curology',
        
      },
      {
        id: 12,
        name: 'Restorative Hair Mask',
        brand: 'Act+',
        
      },
      {
        id: 13,
        name: 'Potatoe Chips',
        brand: 'Pringles',
        
      },
    ],
  },
];

const HomePage = () => {
  return (
    <ScrollView style={styles.container}>
      {products.map((category, categoryIndex) => (
        <View key={categoryIndex} style={styles.section}>
          <Text style={[styles.sectionTitle, category.section === 'Sponsored' && styles.sponsoredTitle]}>
            {category.section}
          </Text>
          <View style={styles.productsRow}>
            {category.items.map((product) => (
              <View key={product.id} style={styles.productContainer}>
                <Image source={product.img} style={styles.productImage} />
                <Text style={styles.productBrand}>{product.brand}</Text>
                <Text style={styles.productName}>{product.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#15718eff',
    marginBottom: 10,
  },
  sponsoredTitle: {
    color: '#daa163ff',
  },
  productsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productContainer: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 10,
  },
  productBrand: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  productName: {
    fontSize: 10,
    color: '#ffffff',
  },
});

export default HomePage;