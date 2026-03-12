import { Platform } from '@/types';

export const defaultPlatforms: Platform[] = [
  {
    id: '1',
    title: 'منصة التدريب الإلكتروني',
    description: 'البوابة الرئيسية للتسجيل في الدورات التدريبية والمتابعة',
    url: 'https://nauss.edu.sa',
    image: '/icons/training.svg',
    visible: true,
    order: 1
  },
  {
    id: '2',
    title: 'نظام إدارة المتدربين',
    description: 'إدارة بيانات المتدربين وسجلاتهم الأكاديمية',
    url: 'https://nauss.edu.sa',
    image: '/icons/students.svg',
    visible: true,
    order: 2
  },
  {
    id: '3',
    title: 'منصة الجدولة',
    description: 'عرض وإدارة جداول الدورات والبرامج التدريبية',
    url: 'https://nauss.edu.sa',
    image: '/icons/schedule.svg',
    visible: true,
    order: 3
  },
  {
    id: '4',
    title: 'نظام التقييم',
    description: 'تقييم البرامج التدريبية والمحتوى التدريبي',
    url: 'https://nauss.edu.sa',
    image: '/icons/evaluation.svg',
    visible: true,
    order: 4
  },
  {
    id: '5',
    title: 'بوابة المدربين',
    description: 'إدارة ملفات المدربين ومهامهم التدريبية',
    url: 'https://nauss.edu.sa',
    image: '/icons/trainers.svg',
    visible: true,
    order: 5
  },
  {
    id: '6',
    title: 'نظام الشهادات',
    description: 'إصدار وإدارة الشهادات التدريبية',
    url: 'https://nauss.edu.sa',
    image: '/icons/certificate.svg',
    visible: true,
    order: 6
  },
  {
    id: '7',
    title: 'منصة التقارير',
    description: 'عرض التقارير والإحصائيات التدريبية',
    url: 'https://nauss.edu.sa',
    image: '/icons/reports.svg',
    visible: true,
    order: 7
  },
  {
    id: '8',
    title: 'نظام الحضور والغياب',
    description: 'تسجيل ومتابعة حضور المتدربين',
    url: 'https://nauss.edu.sa',
    image: '/icons/attendance.svg',
    visible: true,
    order: 8
  }
];
