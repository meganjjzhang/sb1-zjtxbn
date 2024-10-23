interface Hair {
  id: number;
  x: number;
  y: number;
  angle: number;
  removing?: boolean;
}

// Function to check if a point is inside an ellipse
function isInsideEllipse(x: number, y: number, centerX: number, centerY: number, radiusX: number, radiusY: number): boolean {
  const normalizedX = (x - centerX) / radiusX;
  const normalizedY = (y - centerY) / radiusY;
  return (normalizedX * normalizedX + normalizedY * normalizedY) <= 1;
}

// Function to check if a point is in the facial features area
function isInFacialFeatures(x: number, y: number): boolean {
  // Eyes area (left eye)
  if (isInsideEllipse(x, y, 35, 40, 8, 6)) return true;
  // Eyes area (right eye)
  if (isInsideEllipse(x, y, 65, 40, 8, 6)) return true;
  // Eyebrows area (left)
  if (isInsideEllipse(x, y, 35, 35, 8, 4)) return true;
  // Eyebrows area (right)
  if (isInsideEllipse(x, y, 65, 35, 8, 4)) return true;
  
  return false;
}

function generateHairInRegion(
  count: number,
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  angleRange: [number, number],
  hairAngleRange: [number, number]
): Hair[] {
  const hairs: Hair[] = [];
  let attempts = 0;
  const maxAttempts = count * 3; // Prevent infinite loops
  
  while (hairs.length < count && attempts < maxAttempts) {
    const [minAngle, maxAngle] = angleRange;
    const angle = minAngle + Math.random() * (maxAngle - minAngle);
    const r = Math.sqrt(Math.random());
    
    const x = centerX + (r * radiusX * Math.cos(angle));
    const y = centerY + (r * radiusY * Math.sin(angle));
    
    // Only allow hair in the upper 20% of the face (y positions between 15-35)
    if (y < 15 || y > 35 || isInFacialFeatures(x, y)) {
      attempts++;
      continue;
    }
    
    const [minHairAngle, maxHairAngle] = hairAngleRange;
    const hairAngle = minHairAngle + Math.random() * (maxHairAngle - minHairAngle);

    hairs.push({
      id: hairs.length,
      x,
      y,
      angle: hairAngle,
    });
    
    attempts++;
  }
  
  return hairs;
}

export function generateHairs(): Hair[] {
  // Generate hair only in the upper region
  return generateHairInRegion(
    200, // count
    50,  // centerX
    25,  // centerY
    30,  // radiusX
    10,  // radiusY
    [0, Math.PI * 2], // full circle angle range
    [-30, 210]        // hair angle range
  ).map((hair, index) => ({
    ...hair,
    id: index
  }));
}