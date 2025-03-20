#!/usr/bin/env python3
"""
Recommendations Script

This script processes farm data and risk assessment to generate
personalized recommendations for biological products.
"""

import sys
import json
import math
from datetime import datetime, timedelta

def get_product_score(product, crop_type, risk_assessment):
    """
    Calculate a score for a product based on its suitability for the given crop and risks
    """
    score = 0
    
    # Check if the product is compatible with the crop
    if crop_type in product['compatibility'] or 'All crops' in product['compatibility']:
        score += 30
    else:
        return 0  # Product is not compatible with this crop
    
    # Get the risk factors for this crop
    crop_risks = risk_assessment['cropRisks'].get(crop_type, {})
    
    # Match product type with risk factors
    if product['type'] == 'Pest Control' and 'pest' in crop_risks:
        pest_risk = crop_risks['pest']['overall']
        # Higher score for pest control products when pest risk is high
        score += pest_risk * 0.5
    
    elif product['type'] == 'Disease Control' and 'disease' in crop_risks:
        disease_risk = crop_risks['disease']['overall']
        # Higher score for disease control products when disease risk is high
        score += disease_risk * 0.5
    
    elif product['type'] == 'Soil Health' and 'soilHealth' in risk_assessment:
        soil_health = risk_assessment['soilHealth']['overall']
        # Higher score for soil health products when soil health is poor
        score += (100 - soil_health) * 0.4
    
    elif product['type'] == 'Growth Promoter' and 'climate' in crop_risks:
        climate_stress = crop_risks['climate']['overall']
        # Higher score for growth promoters when climate stress is high
        score += climate_stress * 0.3
    
    # Consider product efficacy
    score += product['efficacy'] * 0.2
    
    return score

def get_application_timing(product, crop_type, risk_assessment, current_date=None):
    """
    Determine the optimal application timing for a product
    """
    if current_date is None:
        current_date = datetime.now()
    
    # Default timing is within 7 days
    timing = {
        'window': 'Within 7 Days',
        'urgency': 'Medium',
        'date': (current_date + timedelta(days=7)).strftime('%Y-%m-%d')
    }
    
    # Get the risk factors for this crop
    crop_risks = risk_assessment['cropRisks'].get(crop_type, {})
    
    # Adjust timing based on risk levels and product type
    if product['type'] == 'Pest Control' and 'pest' in crop_risks:
        pest_risk = crop_risks['pest']['overall']
        if pest_risk > 80:
            timing = {
                'window': 'Next 3 Days',
                'urgency': 'High',
                'date': (current_date + timedelta(days=3)).strftime('%Y-%m-%d')
            }
        elif pest_risk > 60:
            timing = {
                'window': 'Within 5 Days',
                'urgency': 'Medium-High',
                'date': (current_date + timedelta(days=5)).strftime('%Y-%m-%d')
            }
    
    elif product['type'] == 'Disease Control' and 'disease' in crop_risks:
        disease_risk = crop_risks['disease']['overall']
        if disease_risk > 80:
            timing = {
                'window': 'Next 3 Days',
                'urgency': 'High',
                'date': (current_date + timedelta(days=3)).strftime('%Y-%m-%d')
            }
        elif disease_risk > 60:
            timing = {
                'window': 'Within 5 Days',
                'urgency': 'Medium-High',
                'date': (current_date + timedelta(days=5)).strftime('%Y-%m-%d')
            }
    
    elif product['type'] == 'Soil Health' and 'soilHealth' in risk_assessment:
        soil_health = risk_assessment['soilHealth']['overall']
        if soil_health < 40:
            timing = {
                'window': 'Within 10 Days',
                'urgency': 'Medium',
                'date': (current_date + timedelta(days=10)).strftime('%Y-%m-%d')
            }
        else:
            timing = {
                'window': 'Within 14 Days',
                'urgency': 'Low',
                'date': (current_date + timedelta(days=14)).strftime('%Y-%m-%d')
            }
    
    elif product['type'] == 'Growth Promoter' and 'climate' in crop_risks:
        climate_stress = crop_risks['climate']['overall']
        if climate_stress > 70:
            timing = {
                'window': 'Within 5 Days',
                'urgency': 'Medium-High',
                'date': (current_date + timedelta(days=5)).strftime('%Y-%m-%d')
            }
        else:
            timing = {
                'window': 'Within 10 Days',
                'urgency': 'Medium',
                'date': (current_date + timedelta(days=10)).strftime('%Y-%m-%d')
            }
    
    return timing

def generate_recommendations(farm_data, risk_assessment, products):
    """
    Generate personalized product recommendations based on farm data and risk assessment
    """
    recommendations = []
    
    # Process each crop
    for crop in farm_data.get('crops', []):
        crop_type = crop.get('type', '')
        
        # Skip if no risk assessment for this crop
        if crop_type not in risk_assessment['cropRisks']:
            continue
        
        # Score each product for this crop
        crop_recommendations = []
        for product in products:
            score = get_product_score(product, crop_type, risk_assessment)
            if score > 0:
                application_timing = get_application_timing(product, crop_type, risk_assessment)
                crop_recommendations.append({
                    'product': product,
                    'score': score,
                    'applicationTiming': application_timing,
                    'cropType': crop_type
                })
        
        # Sort recommendations by score (descending)
        crop_recommendations.sort(key=lambda x: x['score'], reverse=True)
        
        # Add top recommendations
        recommendations.extend(crop_recommendations[:3])
    
    # Sort all recommendations by score
    recommendations.sort(key=lambda x: x['score'], reverse=True)
    
    return recommendations

def main():
    """
    Main function to process farm data and risk assessment to generate recommendations
    """
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input file provided"}))
        sys.exit(1)
    
    input_file = sys.argv[1]
    
    try:
        with open(input_file, 'r') as f:
            input_data = json.load(f)
        
        farm_data = input_data.get('farmData', {})
        risk_assessment = input_data.get('riskAssessment', {})
        
        # In a real application, products would be fetched from a database
        # Here we're using a simplified list of products
        products = [
            {
                'id': 1,
                'name': 'BioDefend Plus',
                'type': 'Pest Control',
                'efficacy': 95,
                'compatibility': ['Cotton', 'Chickpea'],
                'applicationTiming': 'Apply during early flowering stage',
                'benefits': ['Targets aphids specifically', 'Safe for pollinators', 'Residual protection for up to 14 days']
            },
            {
                'id': 2,
                'name': 'MildewGuard Bio',
                'type': 'Disease Control',
                'efficacy': 85,
                'compatibility': ['Cotton', 'Chickpea', 'Wheat'],
                'applicationTiming': 'Apply at first signs of disease or as preventative',
                'benefits': ['Prevents and treats powdery mildew', 'Strengthens plant immune system', 'Rainfast within 1 hour']
            },
            {
                'id': 3,
                'name': 'SoilVital Pro',
                'type': 'Soil Health',
                'efficacy': 80,
                'compatibility': ['All crops'],
                'applicationTiming': 'Apply during field preparation or early growth stages',
                'benefits': ['Increases nitrogen fixation', 'Improves nutrient uptake', 'Enhances soil structure']
            },
            {
                'id': 4,
                'name': 'BioRoot Stimulator',
                'type': 'Growth Promoter',
                'efficacy': 75,
                'compatibility': ['All crops'],
                'applicationTiming': 'Apply during early vegetative growth',
                'benefits': ['Promotes root development', 'Increases drought tolerance', 'Enhances nutrient uptake']
            },
            {
                'id': 5,
                'name': 'NemControl Bio',
                'type': 'Pest Control',
                'efficacy': 80,
                'compatibility': ['Cotton', 'Vegetables'],
                'applicationTiming': 'Apply during field preparation or early growth stages',
                'benefits': ['Controls nematodes naturally', 'Improves root health', 'Long-lasting protection']
            },
            {
                'id': 6,
                'name': 'BlightShield Organic',
                'type': 'Disease Control',
                'efficacy': 80,
                'compatibility': ['Cotton', 'Vegetables'],
                'applicationTiming': 'Apply preventatively or at first signs of disease',
                'benefits': ['Controls multiple types of blight', 'Improves plant vigor', 'Eco-friendly formulation']
            }
        ]
        
        # Generate recommendations
        recommendations = generate_recommendations(farm_data, risk_assessment, products)
        
        # Output the recommendations as JSON
        print(json.dumps({
            'recommendations': recommendations,
            'timestamp': datetime.now().isoformat()
        }))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()

