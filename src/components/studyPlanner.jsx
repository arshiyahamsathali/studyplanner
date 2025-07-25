import React, { useState } from 'react';
import dayjs from 'dayjs';
import image1 from './images/img1.png'
import './studyPlanner.css'
const StudyPlanner = ({ userId }) => {
  const [examDate, setExamDate] = useState('');
  const [dailyHours, setDailyHours] = useState(5);
  const [subjects, setSubjects] = useState([
    { name: '', strength: 'average', difficulty: 'medium' }
  ]);
  const [studyPlan, setStudyPlan] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState([]);
  //const [saveMessage, setSaveMessage] = useState('');

  const getWeight = (strength, difficulty) => {
    const strengthScore = { strong: 1, average: 2, weak: 3 }[strength];
    const difficultyScore = { easy: 1, medium: 2, hard: 3 }[difficulty];
    return strengthScore + difficultyScore;
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { name: '', strength: 'average', difficulty: 'medium' }]);
  };

  const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const generatePlan = async (e) => {
    e.preventDefault();
    if (!examDate || subjects.some(sub => !sub.name)) return;

    const today = dayjs();
    const end = dayjs(examDate);
    const totalDays = end.diff(today, 'day');
    const weights = subjects.map(sub => getWeight(sub.strength, sub.difficulty));
    const totalWeight = weights.reduce((a, b) => a + b, 0);

    const totalStudyHours = totalDays * dailyHours;
    const subjectHours = subjects.map((_, i) =>
      Math.floor((weights[i] / totalWeight) * totalStudyHours)
    );

    let remaining = totalStudyHours - subjectHours.reduce((a, b) => a + b, 0);
    while (remaining > 0) {
      const minIndex = subjectHours.indexOf(Math.min(...subjectHours));
      subjectHours[minIndex]++;
      remaining--;
    }

    const studied = new Array(subjects.length).fill(0);
    const plan = [];

    for (let d = 0; d < totalDays; d++) {
      const date = today.add(d, 'day').format('YYYY-MM-DD');
      const dailyPlan = { date, study: [] };
      let hoursLeft = dailyHours;

      const todaySubjects = shuffle(subjects.map((s, i) => ({ ...s, index: i })))
        .filter((val, idx, arr) => arr.findIndex(v => v.name === val.name) === idx)
        .slice(0, 2 + (d % 2)); // 2 or 3 subjects per day

      const baseHour = Math.floor(hoursLeft / todaySubjects.length);
      let remainingHour = hoursLeft - baseHour * todaySubjects.length;

      todaySubjects.forEach((sub, i) => {
        const index = sub.index;
        let alloc = baseHour + (remainingHour > 0 ? 1 : 0);
        if (alloc > subjectHours[index] - studied[index]) {
          alloc = Math.max(0, subjectHours[index] - studied[index]);
        }
        if (alloc > 0) {
          studied[index] += alloc;
          dailyPlan.study.push({ subject: sub.name, hours: alloc });
          hoursLeft -= alloc;
        }
        if (remainingHour > 0) remainingHour--;
      });

      while (hoursLeft > 0) {
        const nextSubIndex = subjectHours.findIndex((h, i) => h - studied[i] > 0);
        if (nextSubIndex === -1) break;

        const extra = Math.min(hoursLeft, subjectHours[nextSubIndex] - studied[nextSubIndex]);
        if (extra > 0) {
          studied[nextSubIndex] += extra;
          const existing = dailyPlan.study.find(s => s.subject === subjects[nextSubIndex].name);
          if (existing) {
            existing.hours += extra;
          } else {
            dailyPlan.study.push({ subject: subjects[nextSubIndex].name, hours: extra });
          }
          hoursLeft -= extra;
        } else {
          break;
        }
      }

      plan.push(dailyPlan);
    }

    setStudyPlan(plan);

    const summary = [];
    plan.forEach((day, index) => {
      const weekNum = Math.floor(index / 7);
      if (!summary[weekNum]) summary[weekNum] = {};
      day.study.forEach(({ subject, hours }) => {
        summary[weekNum][subject] = (summary[weekNum][subject] || 0) + hours;
      });
    });

    setWeeklySummary(summary);
  };

  return (
    <div>
        <div className='heading'>
          <img className='img1' src={image1} alt='img1'/>
          <h1>StudyMate</h1>
        </div>
        <div>
      <h2 style={{color:'#000'}}>Study Planner</h2>
        <div className='form-con'>
        <form onSubmit={generatePlan} className="space-y-4">
          <div className='contain1'>
              <div>
              <label>📅 Exam Date </label>
              <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} className="border p-2 ml-2" required />
            </div>

            <div>
              <label>⏰ Hours per Day </label>
              <input type="number" min="1" value={dailyHours} onChange={(e) => setDailyHours(parseInt(e.target.value))} className="border p-2 ml-2 w-20" required />
            </div>
          </div>
        <div>
          <h3 className="text-lg font-semibold">📝 Subjects</h3>
          {subjects.map((subject, index) => (
            <div key={index} className="flex flex-wrap gap-2 mt-2">
              <input
                type="text"
                placeholder="Subject"
                value={subject.name}
                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                className="border p-2 w-40"
                required
              />
              <select value={subject.strength} onChange={(e) => handleSubjectChange(index, 'strength', e.target.value)} className="border p-2">
                <option>strong</option>
                <option>average</option>
                <option>weak</option>
              </select>
              <select value={subject.difficulty} onChange={(e) => handleSubjectChange(index, 'difficulty', e.target.value)} className="border p-2">
                <option>easy</option>
                <option>medium</option>
                <option>hard</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={addSubject} className="mt-2" style={{backgroundColor:'#7B6868'}}>+ Add Subject</button>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Generate Plan</button>
      </form>
        </div>
      {studyPlan.length > 0 && (
        <>
          <h3 className="text-xl font-bold mt-8 text-green-600">📅 Daily Study Plan</h3>
          <div className="overflow-auto max-h-96 border p-4 rounded bg-gray-50">
            {studyPlan.map((day, idx) => (
              <div key={idx} className="mb-2">
                <strong>{day.date}:</strong>
                <ul className="list-disc ml-6">
                  {day.study.map((s, i) => (
                    <li key={i}>{s.subject} - {s.hours} hrs</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-bold mt-8 text-purple-600">📈 Weekly Summary</h3>
          <div className="space-y-4 mt-2">
            {weeklySummary.map((week, i) => (
              <div key={i}>
                <strong>Week {i + 1}:</strong>
                <ul className="list-disc ml-6">
                  {Object.entries(week).map(([subject, hours]) => (
                    <li key={subject}>{subject} - {hours} hrs</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default StudyPlanner;
