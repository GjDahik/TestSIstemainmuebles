// Clase para manejar el almacenamiento de propiedades
class PropertyStorage {
    constructor() {
        this.currentBuilding = this.getCurrentBuilding();
        this.properties = this.loadProperties();
    }

    getCurrentBuilding() {
        const urlParams = new URLSearchParams(window.location.search);
        const buildingId = urlParams.get('building');
        if (!buildingId) {
            window.location.href = 'buildings.html';
            return null;
        }

        const buildings = JSON.parse(localStorage.getItem('buildings')) || [];
        const building = buildings.find(b => b.id === buildingId);
        if (!building) {
            window.location.href = 'buildings.html';
            return null;
        }

        return building;
    }

    // Cargar propiedades desde localStorage
    loadProperties() {
        const buildingProperties = JSON.parse(localStorage.getItem(`properties_${this.currentBuilding.id}`)) || [];
        return buildingProperties;
    }

    // Guardar propiedades en localStorage
    saveProperties() {
        localStorage.setItem(`properties_${this.currentBuilding.id}`, JSON.stringify(this.properties));
    }

    // Obtener todas las propiedades
    getAllProperties() {
        return this.properties;
    }

    // Agregar una nueva propiedad
    addProperty(property) {
        property.id = Date.now();
        property.buildingId = this.currentBuilding.id;
        this.properties.push(property);
        this.saveProperties();
    }

    // Actualizar una propiedad existente
    updateProperty(id, updatedProperty) {
        const index = this.properties.findIndex(p => p.id === id);
        if (index !== -1) {
            this.properties[index] = { ...this.properties[index], ...updatedProperty };
            this.saveProperties();
        }
    }

    // Eliminar una propiedad
    deleteProperty(id) {
        this.properties = this.properties.filter(p => p.id !== id);
        this.saveProperties();
    }

    // Método adicional para limpiar todos los datos
    clearAll() {
        this.properties = [];
        localStorage.removeItem('properties');
    }

    getPropertyById(id) {
        return this.properties.find(p => p.id === id);
    }
}

// Crear una instancia global del almacenamiento
const propertyStorage = new PropertyStorage(); 