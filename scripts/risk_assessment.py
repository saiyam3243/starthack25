#!/usr/bin/env python3
"""
Risk Assessment Script

This script processes farm data and applies agronomy stress algorithms
to assess risks for crops based on environmental conditions.
"""

import sys
import json
import math
from datetime import datetime, timedelta

def calculate_disease_risk(weather_data, crop_type):
    """
    Calculate disease risk based on weather conditions and crop type
    """
    # Initialize risk factors
    humidity_risk = 0
    temperature_risk = 0
    rainfall_risk = 0
    
    # Process weather data
    for day in weather_data:
        # High humidity increases disease risk
        if day['humidity'] > 80:
            humidity_risk += 10
        elif day['humidity'] > 70:
            humidity_risk += 5
            
        # Temperature ranges for disease development
        if 18 <= day['temperature'] <= 28:
            temperature_risk += 8
        elif 15 <= day['temperature'] <= 30:
            temperature_risk += 4
            
        # Rainfall increases disease risk
        if day['rainfall'] > 10:
            rainfall_risk += 12
        elif day['rainfall'] > 5:
            rainfall_risk += 6
    
    # Normalize risks
    days = len(weather_data)
    humidity_risk = min(100, humidity_risk / days * 10)
    temperature_risk = min(100, temperature_risk / days * 10)
    rainfall_risk = min(100, rainfall_risk / days * 10)
    
    # Crop-specific adjustments
    if crop_type.lower() == 'cotton':
        # Cotton is more susceptible to certain diseases in humid conditions
        humidity_risk *= 1.2
    elif crop_type.lower() == 'chickpea':
        # Chickpea is more susceptible to diseases in wet conditions
        rainfall_risk *= 1.3
    
    # Calculate overall disease risk
    overall_risk = (humidity_risk * 0.4) + (temperature_risk * 0.3) + (rainfall_risk * 0.3)
    
    return {
        'overall': min(100, overall_risk),
        'factors': {
            'humidity': min(100, humidity_risk),
            'temperature': min(100, temperature_risk),
            'rainfall': min(100, rainfall_risk)
        }
    }

def calculate_pest_risk(weather_data, crop_type):
    """
    Calculate pest risk based on weather conditions and crop type
    """
    # Initialize risk factors
    temperature_risk = 0
    humidity_risk = 0
    
    # Process weather data
    for day in weather_data:
        # Many pests thrive in warm conditions
        if day['temperature'] > 30:
            temperature_risk += 12
        elif day['temperature'] > 25:
            temperature_risk += 8
        elif day['temperature'] > 20:
            temperature_risk += 4
            
        # Moderate humidity favors many pests
        if 60 <= day['humidity'] <= 80:
            humidity_risk += 10
        elif 50 <= day['humidity'] <= 90:
            humidity_risk += 5
    
    # Normalize risks
    days = len(weather_data)
    temperature_risk = min(100, temperature_risk / days * 10)
    humidity_risk = min(100, humidity_risk / days * 10)
    
    # Crop-specific adjustments
    if crop_type.lower() == 'cotton':
        # Cotton is particularly susceptible to aphids and bollworms
        temperature_risk *= 1.3
    elif crop_type.lower() == 'chickpea':
        # Chickpea has specific pest pressures
        humidity_risk *= 1.1
    
    # Calculate overall pest risk
    overall_risk = (temperature_risk * 0.6) + (humidity_risk * 0.4)
    
    return {
        'overall': min(100, overall_risk),
        'factors': {
            'temperature': min(100, temperature_risk),
            'humidity': min(100, humidity_risk)
        }
    }

def calculate_climate_stress(weather_data, crop_type):
    """
    Calculate climate stress based on weather conditions and crop type
    """
    # Initialize risk factors
    heat_stress = 0
    drought_stress = 0
    flood_stress = 0
    
    # Process weather data
    for day in weather_data:
        # Heat stress
        if day['temperature'] > 35:
            heat_stress += 15
        elif day['temperature'] > 32:
            heat_stress += 8
        elif day['temperature'] > 30:
            heat_stress += 4
            
        # Drought stress (low rainfall over time)
        if day['rainfall'] < 1 and day['temperature'] > 30:
            drought_stress += 10
        elif day['rainfall'] < 2:
            drought_stress += 5
            
        # Flood stress (high rainfall)
        if day['rainfall'] > 50:
            flood_stress += 20
        elif day['rainfall'] > 30:
            flood_stress += 12
        elif day['rainfall'] > 20:
            flood_stress += 6
    
    # Normalize risks
    days = len(weather_data)
    heat_stress = min(100, heat_stress / days * 10)
    drought_stress = min(100, drought_stress / days * 10)
    flood_stress = min(100, flood_stress / days * 10)
    
    # Crop-specific adjustments
    if crop_type.lower() == 'cotton':
        # Cotton is relatively drought-tolerant but sensitive to waterlogging
        drought_stress *= 0.8
        flood_stress *= 1.2
    elif crop_type.lower() == 'chickpea':
        # Chickpea is sensitive to heat during flowering
        heat_stress *= 1.3
    
    # Calculate overall climate stress
    overall_stress = max(heat_stress, drought_stress, flood_stress)
    
    return {
        'overall': min(100, overall_stress),
        'factors': {
            'heat': min(100, heat_stress),
            'drought': min(100, drought_stress),
            'flood': min(100, flood_stress)
        }
    }

def assess_soil_health(soil_data):
    """
    Assess soil health based on soil data
    """
    # Initialize soil health factors
    nutrient_score = 0
    structure_score = 0
    biological_score = 0
    
    # Evaluate nutrient levels
    if 'nutrients' in soil_data:
        nutrients = soil_data['nutrients']
        
        # Nitrogen
        if 'nitrogen' in nutrients:
            if nutrients['nitrogen'] > 80:
                nutrient_score += 30
            elif nutrients['nitrogen'] > 50:
                nutrient_score += 20
            elif nutrients['nitrogen'] > 30:
                nutrient_score += 10
        
        # Phosphorus
        if 'phosphorus' in nutrients:
            if nutrients['phosphorus'] > 70:
                nutrient_score += 25
            elif nutrients['phosphorus'] > 40:
                nutrient_score += 15
            elif nutrients['phosphorus'] > 20:
                nutrient_score += 8
        
        # Potassium
        if 'potassium' in nutrients:
            if nutrients['potassium'] > 75:
                nutrient_score += 25
            elif nutrients['potassium'] > 45:
                nutrient_score += 15
            elif nutrients['potassium'] > 25:
                nutrient_score += 8
    
    # Evaluate soil structure
    if 'structure' in soil_data:
        structure = soil_data['structure']
        
        # Organic matter
        if 'organicMatter' in structure:
            if structure['organicMatter'] > 3:
                structure_score += 35
            elif structure['organicMatter'] > 2:
                structure_score += 25
            elif structure['organicMatter'] > 1:
                structure_score += 15
        
        # Compaction
        if 'compaction' in structure:
            if structure['compaction'] < 20:
                structure_score += 30
            elif structure['compaction'] < 40:
                structure_score += 20
            elif structure['compaction'] < 60:
                structure_score += 10
    
    # Evaluate biological activity
    if 'biology' in soil_data:
        biology = soil_data['biology']
        
        # Microbial activity
        if 'microbialActivity' in biology:
            if biology['microbialActivity'] > 70:
                biological_score += 40
            elif biology['microbialActivity'] > 50:
                biological_score += 30
            elif biology['microbialActivity'] > 30:
                biological_score += 20
        
        # Earthworm population
        if 'earthworms' in biology:
            if biology['earthworms'] > 60:
                biological_score += 30
            elif biology['earthworms'] > 40:
                biological_score += 20
            elif biology['earthworms'] > 20:
                biological_score += 10
    
    # Normalize scores
    nutrient_score = min(100, nutrient_score)
    structure_score = min(100, structure_score)
    biological_score = min(100, biological_score)
    
    # Calculate overall soil health
    overall_health = (nutrient_score * 0.3) + (structure_score * 0.3) + (biological_score * 0.4)
    
    return {
        'overall': overall_health,
        'factors': {
            'nutrients': nutrient_score,
            'structure': structure_score,
            'biology': biological_score
        }
    }

def main():
    """
    Main function to process farm data and generate risk assessment
    """
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input file provided"}))
        sys.exit(1)
    
    input_file = sys.argv[1]
    
    try:
        with open(input_file, 'r') as f:
            farm_data = json.load(f)
        
        # Extract necessary data
        weather_data = farm_data.get('weatherData', [])
        soil_data = farm_data.get('soilData', {})
        crops = farm_data.get('crops', [])
        
        # Generate risk assessments for each crop
        crop_risks = {}
        for crop in crops:
            crop_type = crop.get('type', '')
            crop_risks[crop_type] = {
                'disease': calculate_disease_risk(weather_data, crop_type),
                'pest': calculate_pest_risk(weather_data, crop_type),
                'climate': calculate_climate_stress(weather_data, crop_type)
            }
        
        # Assess soil health
        soil_health = assess_soil_health(soil_data)
        
        # Compile the risk assessment
        risk_assessment = {
            'cropRisks': crop_risks,
            'soilHealth': soil_health,
            'timestamp': datetime.now().isoformat(),
            'overallRisk': {
                'disease': max([risk['disease']['overall'] for crop, risk in crop_risks.items()]),
                'pest': max([risk['pest']['overall'] for crop, risk in crop_risks.items()]),
                'climate': max([risk['climate']['overall'] for crop, risk in crop_risks.items()])
            }
        }
        
        # Output the risk assessment as JSON
        print(json.dumps(risk_assessment))
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()

