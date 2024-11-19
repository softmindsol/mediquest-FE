import toast from "react-hot-toast";

export function distributeQuestions(
  selectedSubjects,
  availableSubjects,
  totalQuestions
) {
  // Create a lookup for available questions per subject and city
  const availabilityMap = {};
  availableSubjects.forEach((subject) => {
    availabilityMap[subject.subjectName] = {};
    subject.schools.forEach((school) => {
      availabilityMap[subject.subjectName][school.school] = school.count;
    });
  });

  // Calculate total available questions for selected subjects and cities
  let totalAvailable = 0;
  const subjectAvailability = [];

  selectedSubjects.forEach((subject) => {
    subject.city.forEach((city) => {
      const available = availabilityMap[subject.name]?.[city] || 0;
      subjectAvailability.push({
        name: subject.name,
        city: city,
        available: available,
      });
      totalAvailable += available;
    });
  });

  // If total requested questions exceed available, adjust to maximum available
  if (totalQuestions > totalAvailable) {
    toast.error(
      `Requested ${totalQuestions} questions, but only ${totalAvailable} are available.`
    );
    return []; // Return an empty array to indicate failure in distribution
  }

  const questionsToDistribute = Math.min(totalQuestions, totalAvailable);

  // Initial distribution based on availability ratios
  const distribution = subjectAvailability.map((item) => {
    const ratio = item.available / totalAvailable;
    let questions = Math.floor(questionsToDistribute * ratio);

    return {
      name: item.name,
      city: item.city,
      totalQuestions: questions,
    };
  });

  // Handle remaining questions due to rounding
  let distributedSum = distribution.reduce(
    (sum, item) => sum + item.totalQuestions,
    0
  );
  let remaining = questionsToDistribute - distributedSum;

  // Greedily allocate remaining questions
  if (remaining > 0) {
    // Create a map for fast access to items in distribution
    const distributionMap = distribution.reduce((map, item) => {
      map[`${item.name}_${item.city}`] = item;
      return map;
    }, {});

    // Sort distribution based on available questions in descending order
    const sorted = [...subjectAvailability]
      .sort(
        (a, b) =>
          availabilityMap[b.name][b.city] - availabilityMap[a.name][a.city]
      )
      .map((item) => `${item.name}_${item.city}`);

    // Greedily allocate remaining questions
    while (remaining > 0) {
      for (let key of sorted) {
        const current = distributionMap[key];
        const available = availabilityMap[current.name][current.city];
        if (current.totalQuestions < available) {
          current.totalQuestions++;
          remaining--;
          if (remaining <= 0) break;
        }
      }
    }
  }

  // Ensure no subject-city pair has 0 questions if possible
  const entries = distribution.length;
  if (
    questionsToDistribute >= entries &&
    distribution.some((item) => item.totalQuestions === 0)
  ) {
    // Ensure at least one question per entry if possible
    distribution.forEach((item) => {
      if (item.totalQuestions === 0) {
        const maxAvailable = availabilityMap[item.name][item.city];
        if (maxAvailable > 0) {
          item.totalQuestions = 1;
          // Reduce one question from the subject with the most questions
          const maxEntry = distribution.reduce((max, curr) =>
            curr.totalQuestions > max.totalQuestions ? curr : max
          );
          if (maxEntry.totalQuestions > 1) {
            maxEntry.totalQuestions--;
          }
        }
      }
    });
  }

  // If there are remaining questions after all fixes, adjust proportionally
  let finalDistributedSum = distribution.reduce(
    (sum, item) => sum + item.totalQuestions,
    0
  );
  let finalRemaining = questionsToDistribute - finalDistributedSum;
  if (finalRemaining > 0) {
    // Redistribute remaining questions to subjects with the highest available
    distribution.sort(
      (a, b) =>
        availabilityMap[b.name][b.city] - availabilityMap[a.name][a.city]
    );
    distribution.forEach((item) => {
      if (
        finalRemaining > 0 &&
        item.totalQuestions < availabilityMap[item.name][item.city]
      ) {
        item.totalQuestions++;
        finalRemaining--;
      }
    });
  }

  return distribution;
}

// Example usage:
const selectedSubjects = [
  { name: "Anatomie 1", city: ["Rabat"] },
  { name: "Anatomie 2", city: ["Rabat"] },
  { name: "Histoire de la Médecine / Psycho-Sociologie", city: ["Rabat"] },
];

const availableSubjects = [
  {
    subjectName: "Anatomie 1",
    totalQuestions: 49,
    schools: [{ school: "Rabat", count: 9 }],
  },
  {
    subjectName: "Anatomie 2",
    totalQuestions: 12,
    schools: [{ school: "Rabat", count: 12 }],
  },
  {
    subjectName: "Histoire de la Médecine / Psycho-Sociologie",
    totalQuestions: 53,
    schools: [{ school: "Rabat", count: 53 }],
  },
];

const totalQuestions = 10; // Example request

// Call the function
const distributedQuestions = distributeQuestions(
  selectedSubjects,
  availableSubjects,
  totalQuestions
);
