import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const WideCard = ({id, brand, name, img, onpress}) => {
    return (
        <TouchableOpacity key={id} style={styles.card} onpress={onpress}>
            <View style={styles.blueOverlay}>
              <Text style={styles.productBrand}>{brand}</Text>
              <Text style={styles.productName}>{name}</Text>
            </View>
            <Image source={img} style={styles.productImage} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        boxShadow: '0px 0px 31.608px -10.196px rgba(0, 0, 0, 0.25)',
        width: '72vw',
        height: '66vw',
        marginRight: 16,
    },
    productImage: { 
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 15,
        marginBottom: 10,
    },
    productBrand: {
        marginLeft: 12,
        fontWeight: '600',
        color: '#fff',
    },
    productName: {
        color: '#fff',
        marginLeft: 12,
    },  
    blueOverlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: '70%',
        zIndex: 3,
    }
});

export default WideCard;