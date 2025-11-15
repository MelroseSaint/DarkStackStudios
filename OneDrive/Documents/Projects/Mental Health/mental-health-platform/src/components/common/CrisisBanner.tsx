import { useState, useEffect } from 'react';
import { Phone, AlertTriangle, X, ExternalLink } from 'lucide-react';

export default function CrisisBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  const crisisResources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      phone: "988",
      text: "Text 'HELLO' to 741741",
      description: "24/7 free and confidential support",
      priority: 1
    },
    {
      name: "Crisis Text Line",
      phone: "Text 'HELLO' to 741741",
      description: "Text with a trained crisis counselor",
      priority: 2
    },
    {
      name: "Emergency Services",
      phone: "911",
      description: "Life-threatening emergencies",
      priority: 3
    }
  ];

  const handleEmergencyCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleCrisisText = () => {
    window.location.href = "sms:741741&body=HELLO";
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Crisis Banner */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-200" />
              <span className="font-medium">If you're in crisis or having thoughts of suicide:</span>
              <button
                onClick={() => handleEmergencyCall('988')}
                className="inline-flex items-center space-x-2 bg-white text-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-50 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call 988</span>
              </button>
              <button
                onClick={handleCrisisText}
                className="inline-flex items-center space-x-2 bg-red-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-800 transition-colors"
              >
                <span>Text 741741</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setEmergencyModalOpen(true)}
                className="text-red-200 hover:text-white underline text-sm"
              >
                More Resources
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-red-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Resources Modal */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Crisis Resources</h2>
                <button
                  onClick={() => setEmergencyModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {crisisResources.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.name}</h3>
                        <p className="text-gray-600 mb-3">{resource.description}</p>
                        
                        <div className="flex flex-wrap gap-3">
                          {resource.phone && (
                            <button
                              onClick={() => handleEmergencyCall(resource.phone.replace(/\D/g, ''))}
                              className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                            >
                              <Phone className="w-4 h-4" />
                              <span>{resource.phone}</span>
                            </button>
                          )}
                          
                          {resource.text && (
                            <button
                              onClick={handleCrisisText}
                              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                            >
                              <span>Text Now</span>
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {resource.priority === 1 && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important</h3>
                <p className="text-yellow-700 text-sm">
                  If you or someone you know is in immediate danger, call 911 or go to your nearest emergency room. 
                  These resources are for crisis support and are not a substitute for emergency medical care.
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setEmergencyModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}