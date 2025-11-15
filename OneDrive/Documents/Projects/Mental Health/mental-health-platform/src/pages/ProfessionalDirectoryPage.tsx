import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Professional {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  location: string;
  availability: string;
  rating: number;
  reviews: number;
  priceRange: string;
  acceptsInsurance: boolean;
  imageUrl?: string;
}

const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Licensed Clinical Psychologist',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    location: 'New York, NY',
    availability: 'Available this week',
    rating: 4.9,
    reviews: 127,
    priceRange: '$150-200/session',
    acceptsInsurance: true
  },
  {
    id: '2',
    name: 'Michael Chen, LCSW',
    title: 'Licensed Clinical Social Worker',
    specialties: ['Family Therapy', 'Relationships', 'LGBTQ+'],
    location: 'Los Angeles, CA',
    availability: 'Available next week',
    rating: 4.8,
    reviews: 89,
    priceRange: '$120-150/session',
    acceptsInsurance: true
  },
  {
    id: '3',
    name: 'Dr. Maria Rodriguez',
    title: 'Psychiatrist',
    specialties: ['ADHD', 'Bipolar Disorder', 'Medication Management'],
    location: 'Chicago, IL',
    availability: 'Available in 2 weeks',
    rating: 4.7,
    reviews: 156,
    priceRange: '$250-300/session',
    acceptsInsurance: false
  },
  {
    id: '4',
    name: 'Jennifer Williams, LMFT',
    title: 'Licensed Marriage & Family Therapist',
    specialties: ['Couples Counseling', 'Communication', 'Conflict Resolution'],
    location: 'Houston, TX',
    availability: 'Available this week',
    rating: 4.9,
    reviews: 203,
    priceRange: '$140-180/session',
    acceptsInsurance: true
  }
];

export default function ProfessionalDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const specialties = [
    'Anxiety', 'Depression', 'Trauma', 'PTSD', 'ADHD', 'Bipolar Disorder',
    'Family Therapy', 'Couples Counseling', 'LGBTQ+', 'Relationships',
    'Medication Management', 'Communication', 'Conflict Resolution'
  ];

  const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX'];

  const filteredProfessionals = mockProfessionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || professional.specialties.includes(selectedSpecialty);
    const matchesLocation = !selectedLocation || professional.location.includes(selectedLocation);
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find Mental Health Professionals
        </h1>
        <p className="text-lg text-gray-600">
          Connect with licensed therapists, counselors, and psychiatrists who can help you on your mental health journey.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search by name or specialty
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search professionals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
              Specialty
            </label>
            <select
              id="specialty"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProfessionals.map((professional) => (
          <div key={professional.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">
                    {professional.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {professional.name}
                  </h3>
                  <p className="text-gray-600">{professional.title}</p>
                  <p className="text-sm text-gray-500">{professional.location}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
              <div className="flex flex-wrap gap-2">
                {professional.specialties.map((specialty) => (
                  <span key={specialty} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {professional.rating}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({professional.reviews} reviews)
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {professional.priceRange}
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                professional.acceptsInsurance 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {professional.acceptsInsurance ? 'Accepts Insurance' : 'Self-Pay Only'}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Availability:</strong> {professional.availability}
              </p>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Book Appointment
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProfessionals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No professionals found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Finding the Right Professional
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Types of Professionals</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Psychiatrists:</strong> Medical doctors who can prescribe medication</li>
              <li>• <strong>Psychologists:</strong> Provide therapy and psychological testing</li>
              <li>• <strong>Licensed Counselors:</strong> Provide talk therapy and support</li>
              <li>• <strong>Social Workers:</strong> Help with life challenges and resources</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Questions to Ask</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• What are your areas of expertise?</li>
              <li>• What treatment approaches do you use?</li>
              <li>• Do you accept my insurance?</li>
              <li>• What are your availability and fees?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}