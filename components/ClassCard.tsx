'use client';

import Link from 'next/link';

interface ClassCardProps {
  id: string;
  level: string;
  danceStyle: string;
  time: string;
  instructor: string;
  duration: number;
  maxStudents: number;
  enrolled: number;
  description: string;
  ageGroup?: string;
}

export default function ClassCard({
  id,
  level,
  danceStyle,
  time,
  instructor,
  duration,
  maxStudents,
  enrolled,
  description,
  ageGroup,
}: ClassCardProps) {
  const isFull = enrolled >= maxStudents;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-carnival-gold p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-carnival-red mb-1">
            {danceStyle}
          </h3>
          <p className="text-sm bg-carnival-lightBg text-carnival-darkBg px-2 py-1 rounded inline-block font-accent">
            {level}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-carnival-gold">{enrolled}/{maxStudents}</p>
          <p className="text-xs text-gray-500">Inscritos</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <div className="space-y-2 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span>⏰</span>
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>⏱️</span>
          <span>{duration} minutos</span>
        </div>
        <div className="flex items-center gap-2">
          <span>👨‍🏫</span>
          <span>{instructor}</span>
        </div>
        {ageGroup && (
          <div className="flex items-center gap-2">
            <span>👶</span>
            <span>{ageGroup}</span>
          </div>
        )}
      </div>

      <Link
        href={`/inscripcion?class=${id}`}
        className={`block w-full text-center py-2 rounded-lg font-accent font-bold transition ${
          isFull
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'btn-secondary'
        }`}
      >
        {isFull ? 'Clase Llena' : 'Inscribirse'}
      </Link>
    </div>
  );
}
