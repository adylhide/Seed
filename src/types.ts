<<<<<<< HEAD
export interface ProjectData {
  title: string;
  description: string;
  milestones: string[];
  completedMilestones: boolean[];
  completedAt: (string | null)[];
}

export interface StepProps {
  data: ProjectData;
  setData: React.Dispatch<React.SetStateAction<ProjectData>>;
  onNext: () => void;
  onBack?: () => void;
}

export interface StepPropsWithBack extends StepProps {
  onBack: () => void;
}

export interface DashboardProps {
  data: ProjectData;
  setData: React.Dispatch<React.SetStateAction<ProjectData>>;
  onBack: () => void;
}

=======
export interface ProjectData {
  title: string;
  description: string;
  milestones: string[];
  completedMilestones: boolean[];
  completedAt: (string | null)[];
}

export interface StepProps {
  data: ProjectData;
  setData: React.Dispatch<React.SetStateAction<ProjectData>>;
  onNext: () => void;
  onBack?: () => void;
}

export interface StepPropsWithBack extends StepProps {
  onBack: () => void;
}

export interface DashboardProps {
  data: ProjectData;
  setData: React.Dispatch<React.SetStateAction<ProjectData>>;
  onBack: () => void;
}

>>>>>>> ca6396812bbdbcb8ae8866f8b279a99a82332b8a
