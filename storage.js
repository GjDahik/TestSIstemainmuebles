// Clase para manejar el almacenamiento de edificios
class BuildingStorage {
    constructor() {
        this.buildings = this.loadBuildings();
        if (this.buildings.length === 0) {
            this.initializeDefaultBuildings();
        }
    }

    loadBuildings() {
        return JSON.parse(localStorage.getItem('buildings')) || [];
    }

    saveBuildings() {
        localStorage.setItem('buildings', JSON.stringify(this.buildings));
    }

    initializeDefaultBuildings() {
        const defaultBuildings = [
            {
                id: 'edificio-azul',
                name: 'Edificio Azul',
                address: 'Av. Principal 123, Ciudad',
                images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
                stats: { floors: 15, units: 120, parking: 200 },
                amenities: ['piscina', 'gimnasio', 'seguridad']
            },
            {
                id: 'torre-verde',
                name: 'Torre Verde',
                address: 'Calle Secundaria 456, Ciudad',
                images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
                stats: { floors: 20, units: 150, parking: 250 },
                amenities: ['piscina', 'gimnasio', 'seguridad', 'jardin']
            },
            {
                id: 'edificio-rojo',
                name: 'Edificio Rojo',
                address: 'Av. Terciaria 789, Ciudad',
                images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
                stats: { floors: 10, units: 80, parking: 100 },
                amenities: ['piscina', 'seguridad']
            },
            {
                id: 'torre-amarilla',
                name: 'Torre Amarilla',
                address: 'Calle Cuarta 101, Ciudad',
                images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
                stats: { floors: 25, units: 200, parking: 300 },
                amenities: ['piscina', 'gimnasio', 'seguridad', 'jardin', 'terraza']
            },
            {
                id: 'edificio-morado',
                name: 'Edificio Morado',
                address: 'Av. Quinta 202, Ciudad',
                images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
                stats: { floors: 12, units: 90, parking: 120 },
                amenities: ['piscina', 'gimnasio', 'seguridad', 'salon']
            },
            {
                id: 'torre-naranja',
                name: 'Torre Naranja',
                address: 'Calle Sexta 303, Ciudad',
                images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
                stats: { floors: 18, units: 160, parking: 220 },
                amenities: ['piscina', 'gimnasio', 'seguridad', 'jardin', 'terraza', 'salon']
            }
        ];
        this.buildings = defaultBuildings;
        this.saveBuildings();
    }

    addBuilding(building) {
        building.id = 'building-' + Date.now();
        this.buildings.push(building);
        this.saveBuildings();
    }

    updateBuilding(buildingId, updatedBuilding) {
        const index = this.buildings.findIndex(b => b.id === buildingId);
        if (index !== -1) {
            this.buildings[index] = { ...this.buildings[index], ...updatedBuilding };
            this.saveBuildings();
        }
    }

    getBuildings() {
        return this.buildings;
    }

    getBuilding(buildingId) {
        return this.buildings.find(b => b.id === buildingId);
    }

    deleteBuilding(buildingId) {
        const index = this.buildings.findIndex(b => b.id === buildingId);
        if (index !== -1) {
            this.buildings.splice(index, 1);
            this.saveBuildings();
        }
    }
}

// Clase para manejar el almacenamiento de propiedades
class PropertyStorage {
    constructor() {
        this.currentBuilding = this.getCurrentBuilding();
        if (this.currentBuilding) {
            this.properties = this.loadProperties();
        } else {
            this.properties = [];
        }
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
        if (!this.currentBuilding) return [];
        const buildingProperties = JSON.parse(localStorage.getItem(`properties_${this.currentBuilding.id}`)) || [];
        return buildingProperties;
    }

    // Guardar propiedades en localStorage
    saveProperties() {
        if (!this.currentBuilding) return;
        localStorage.setItem(`properties_${this.currentBuilding.id}`, JSON.stringify(this.properties));
    }

    // Obtener todas las propiedades
    getAllProperties() {
        if (!this.currentBuilding) return [];
        return this.properties;
    }

    // Agregar una nueva propiedad
    addProperty(property) {
        if (!this.currentBuilding) return;
        property.id = Date.now();
        property.buildingId = this.currentBuilding.id;
        this.properties.push(property);
        this.saveProperties();
    }

    // Actualizar una propiedad existente
    updateProperty(id, updatedProperty) {
        if (!this.currentBuilding) return;
        const index = this.properties.findIndex(p => p.id === id);
        if (index !== -1) {
            this.properties[index] = { ...this.properties[index], ...updatedProperty };
            this.saveProperties();
        }
    }

    // Eliminar una propiedad
    deleteProperty(id) {
        if (!this.currentBuilding) return;
        this.properties = this.properties.filter(p => p.id !== id);
        this.saveProperties();
    }

    getPropertyById(id) {
        if (!this.currentBuilding) return null;
        return this.properties.find(p => p.id === id);
    }

    // Método adicional para limpiar todos los datos
    clearAll() {
        this.properties = [];
        localStorage.removeItem('properties');
    }
}

// Crear instancias globales del almacenamiento
const buildingStorage = new BuildingStorage();
const propertyStorage = new PropertyStorage();