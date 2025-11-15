'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dumbbell, 
  Apple, 
  Droplet, 
  Moon, 
  TrendingUp, 
  Users, 
  Crown,
  Play,
  Clock,
  Flame,
  Heart,
  Target,
  Calendar,
  ShoppingCart,
  Award,
  Zap,
  CheckCircle2,
  ChevronRight,
  Smile,
  Activity,
  Plus
} from 'lucide-react';
import { motivationalQuotes, quickMeals, workouts, communityPosts, premiumPlans, shoppingList } from '@/lib/data';
import { getMotivationalQuote, calculateProgress, getGoalLabel, getLevelLabel } from '@/lib/utils-vivafit';
import type { DailySummary, UserGoal, FitnessLevel } from '@/lib/types';
import { Steps } from '@/components/Steps';

export default function VivaFitApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [dailyQuote, setDailyQuote] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Dados do usuário (mock)
  const [userGoal] = useState<UserGoal>('lose');
  const [userLevel] = useState<FitnessLevel>('beginner');
  
  // Resumo diário
  const [dailySummary] = useState<DailySummary>({
    date: new Date().toISOString(),
    caloriesConsumed: 1200,
    caloriesGoal: 2000,
    waterIntake: 1500,
    waterGoal: 2500,
    sleepHours: 7,
    steps: 6500,
    mood: 'good',
    workoutCompleted: false,
  });

  useEffect(() => {
    setMounted(true);
    setDailyQuote(getMotivationalQuote(motivationalQuotes));
  }, []);

  const caloriesProgress = calculateProgress(dailySummary.caloriesConsumed, dailySummary.caloriesGoal);
  const waterProgress = calculateProgress(dailySummary.waterIntake, dailySummary.waterGoal);
  const stepsProgress = calculateProgress(dailySummary.steps, 10000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-green-500 p-2 rounded-xl shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  VivaFit+
                </h1>
                <p className="text-xs text-gray-600">Sua rotina fitness começa agora</p>
              </div>
            </div>
            {!isPremium && (
              <Button 
                onClick={() => setActiveTab('premium')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg"
              >
                <Crown className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Premium</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Desktop Tabs */}
          <TabsList className="hidden md:grid w-full grid-cols-5 mb-6 bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-sm">
            <TabsTrigger value="home" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Início
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
              <Apple className="w-4 h-4 mr-2" />
              Nutrição
            </TabsTrigger>
            <TabsTrigger value="workouts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
              <Dumbbell className="w-4 h-4 mr-2" />
              Treinos
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Progresso
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Comunidade
            </TabsTrigger>
          </TabsList>

          {/* HOME TAB */}
          <TabsContent value="home" className="space-y-6">
            {/* Motivational Quote */}
            <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 shadow-xl overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold mb-2 text-white/90">💪 Frase do Dia</p>
                    {mounted ? (
                      <p className="text-white font-medium text-base leading-relaxed">{dailyQuote}</p>
                    ) : (
                      <div className="h-12 bg-white/20 rounded animate-pulse" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Calories */}
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <Badge variant="outline" className="text-xs">{caloriesProgress}%</Badge>
                  </div>
                  <CardTitle className="text-sm text-gray-600">Calorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    {dailySummary.caloriesConsumed}
                  </p>
                  <Progress value={caloriesProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Meta: {dailySummary.caloriesGoal}</p>
                </CardContent>
              </Card>

              {/* Water */}
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Droplet className="w-5 h-5 text-blue-500" />
                    <Badge variant="outline" className="text-xs">{waterProgress}%</Badge>
                  </div>
                  <CardTitle className="text-sm text-gray-600">Água</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    {dailySummary.waterIntake}ml
                  </p>
                  <Progress value={waterProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Meta: {dailySummary.waterGoal}ml</p>
                </CardContent>
              </Card>

              {/* Sleep */}
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Moon className="w-5 h-5 text-indigo-500" />
                    <Badge variant="outline" className="text-xs">
                      {dailySummary.sleepHours >= 7 ? '✓' : '!'}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm text-gray-600">Sono</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    {dailySummary.sleepHours}h
                  </p>
                  <p className="text-xs text-gray-500">Meta: 7-9 horas</p>
                </CardContent>
              </Card>

              {/* Steps */}
              <Card className="hover:shadow-lg transition-all hover:scale-105">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    <Badge variant="outline" className="text-xs">{stepsProgress}%</Badge>
                  </div>
                  <CardTitle className="text-sm text-gray-600">Passos</CardTitle>
                </CardHeader>
                <CardContent>
                  <Steps dailySummary={dailySummary} />
                  <Progress value={stepsProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">Meta: 10.000</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Workout */}
            <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      Treino Sugerido Hoje
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Baseado no seu nível: {getLevelLabel(userLevel)}
                    </CardDescription>
                  </div>
                  <Badge className="bg-blue-500">{workouts[0].duration} min</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{workouts[0].name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{workouts[0].description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg"
                      onClick={() => setActiveTab('workouts')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Começar Agora
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all"
                onClick={() => setActiveTab('nutrition')}
              >
                <Apple className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium">Ver Refeições</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all"
                onClick={() => setActiveTab('progress')}
              >
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium">Meu Progresso</span>
              </Button>
            </div>
          </TabsContent>

          {/* NUTRITION TAB */}
          <TabsContent value="nutrition" className="space-y-6">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5" />
                  Plano Alimentar
                </CardTitle>
                <CardDescription className="text-white/90">
                  Objetivo: {getGoalLabel(userGoal)} • Meta: {dailySummary.caloriesGoal} cal/dia
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Macros Summary */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-blue-600">P</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">150g</p>
                  <p className="text-xs text-gray-600 mt-1">Proteína</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-green-600">C</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">200g</p>
                  <p className="text-xs text-gray-600 mt-1">Carboidratos</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold text-orange-600">G</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">60g</p>
                  <p className="text-xs text-gray-600 mt-1">Gorduras</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Meals */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Refeições Rápidas
                </h3>
                <Button variant="ghost" size="sm">
                  Ver Todas
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickMeals.map((meal) => (
                  <Card key={meal.id} className="hover:shadow-lg transition-all hover:scale-[1.02]">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{meal.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">{meal.time}</span>
                          </div>
                        </div>
                        {meal.isPremium && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                          <span className="text-sm text-gray-600">Calorias</span>
                          <span className="font-bold text-orange-600">{meal.calories} kcal</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <p className="font-bold text-blue-700">{meal.protein}g</p>
                            <p className="text-gray-600">Proteína</p>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <p className="font-bold text-green-700">{meal.carbs}g</p>
                            <p className="text-gray-600">Carbs</p>
                          </div>
                          <div className="text-center p-2 bg-orange-50 rounded">
                            <p className="font-bold text-orange-700">{meal.fats}g</p>
                            <p className="text-gray-600">Gordura</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          variant={meal.isPremium && !isPremium ? "outline" : "default"}
                          disabled={meal.isPremium && !isPremium}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {meal.isPremium && !isPremium ? 'Requer Premium' : 'Adicionar ao Diário'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Shopping List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  Lista de Compras Semanal
                </CardTitle>
                <CardDescription>Itens essenciais para sua semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shoppingList.map((category, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        {category.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item, itemIdx) => (
                          <Badge key={itemIdx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      {idx < shoppingList.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WORKOUTS TAB */}
          <TabsContent value="workouts" className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" />
                  Treinos em Casa
                </CardTitle>
                <CardDescription className="text-white/90">
                  Treinos completos sem equipamentos • Nível: {getLevelLabel(userLevel)}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Featured: 7-min Workout */}
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 hover:shadow-2xl transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                    <Zap className="w-10 h-10" />
                  </div>
                  <div className="flex-1">
                    <Badge className="bg-white/20 text-white mb-2">⚡ Destaque</Badge>
                    <h3 className="font-bold text-xl mb-1">Treino Rápido de 7 Minutos</h3>
                    <p className="text-white/90 text-sm mb-3">
                      Perfeito para quem tem pouco tempo!
                    </p>
                    <Button className="bg-white text-orange-600 hover:bg-gray-100">
                      <Play className="w-4 h-4 mr-2" />
                      Começar Agora
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Workouts List */}
            <div className="space-y-4">
              {workouts.map((workout) => (
                <Card 
                  key={workout.id} 
                  className={`hover:shadow-xl transition-all hover:scale-[1.01] ${
                    workout.isPremium && !isPremium ? 'opacity-75' : ''
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{workout.name}</CardTitle>
                          {workout.isPremium && (
                            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500">
                              <Crown className="w-3 h-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{workout.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1 bg-green-50 rounded-full">
                          <Target className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{getLevelLabel(workout.level)}</span>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1 bg-orange-50 rounded-full">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{workout.exercises.length} exercícios</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Exercícios inclusos:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {workout.exercises.slice(0, 4).map((exercise) => (
                            <div key={exercise.id} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{exercise.name}</span>
                            </div>
                          ))}
                        </div>
                        {workout.exercises.length > 4 && (
                          <p className="text-xs text-gray-500 text-center">
                            +{workout.exercises.length - 4} exercícios adicionais
                          </p>
                        )}
                      </div>

                      <Button 
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg"
                        disabled={workout.isPremium && !isPremium}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {workout.isPremium && !isPremium ? 'Assine Premium para Acessar' : 'Iniciar Treino'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PROGRESS TAB */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Acompanhamento de Resultados
                </CardTitle>
                <CardDescription className="text-white/90">
                  Evolução semanal e conquistas
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Current Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">72kg</p>
                  <p className="text-sm text-gray-600 mt-1">Peso Atual</p>
                  <Badge variant="outline" className="mt-2 text-xs">-3kg este mês</Badge>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-green-600">23.5</p>
                  <p className="text-sm text-gray-600 mt-1">IMC</p>
                  <Badge variant="outline" className="mt-2 text-xs">Peso normal</Badge>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-3xl font-bold text-orange-600">18%</p>
                  <p className="text-sm text-gray-600 mt-1">Gordura</p>
                  <Badge variant="outline" className="mt-2 text-xs">-2% este mês</Badge>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Dumbbell className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-3xl font-bold text-purple-600">15</p>
                  <p className="text-sm text-gray-600 mt-1">Treinos</p>
                  <Badge variant="outline" className="mt-2 text-xs">Este mês</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Progress Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Evolução de Peso (30 dias)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <TrendingUp className="w-16 h-16 text-blue-500 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-700">Gráfico de Evolução</p>
                    <p className="text-xs text-gray-500 mt-1">Continue registrando seus dados diariamente!</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Registrar Peso
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Conquistas Desbloqueadas
                </CardTitle>
                <CardDescription>Continue assim para desbloquear mais!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:scale-105 transition-transform cursor-pointer">
                    <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">Sequência de 7 dias</p>
                    <p className="text-xs text-gray-600 mt-1">Desbloqueado!</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:scale-105 transition-transform cursor-pointer">
                    <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Dumbbell className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">15 treinos completos</p>
                    <p className="text-xs text-gray-600 mt-1">Desbloqueado!</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:scale-105 transition-transform cursor-pointer">
                    <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">Meta semanal atingida</p>
                    <p className="text-xs text-gray-600 mt-1">Desbloqueado!</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl opacity-50">
                    <div className="bg-gray-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-xs font-bold text-gray-800">30 dias consecutivos</p>
                    <p className="text-xs text-gray-600 mt-1">Bloqueado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Resumo Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Dumbbell className="w-4 h-4 text-blue-500" />
                        Treinos completados
                      </span>
                      <span className="font-semibold text-blue-600">5/7 dias</span>
                    </div>
                    <Progress value={71} className="h-3" />
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        Meta de calorias
                      </span>
                      <span className="font-semibold text-orange-600">6/7 dias</span>
                    </div>
                    <Progress value={86} className="h-3" />
                  </div>
                  <Separator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-blue-500" />
                        Meta de água
                      </span>
                      <span className="font-semibold text-blue-600">7/7 dias</span>
                    </div>
                    <Progress value={100} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMMUNITY TAB */}
          <TabsContent value="community" className="space-y-6">
            <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Comunidade VivaFit+
                </CardTitle>
                <CardDescription className="text-white/90">
                  Compartilhe sua jornada e inspire outros
                </CardDescription>
              </CardHeader>
            </Card>

            {/* New Post */}
            <Card className="border-2 border-dashed border-blue-300 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="bg-gradient-to-br from-blue-500 to-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold">
                    <Smile className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Compartilhe seu progresso ou dica...</p>
                    <p className="text-xs text-gray-500 mt-1">Inspire a comunidade!</p>
                  </div>
                  <Plus className="w-5 h-5 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            {/* Community Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-all hover:scale-[1.01]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-br from-blue-500 to-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {post.userName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-sm">{post.userName}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(post.timestamp).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-3 leading-relaxed">{post.content}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="font-medium">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">{post.comments} comentários</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Premium Community CTA */}
            {!isPremium && (
              <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 hover:shadow-2xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <Crown className="w-12 h-12" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Acesso Ilimitado à Comunidade</h3>
                    <p className="text-white/90 text-sm mb-4">
                      Participe de desafios exclusivos, grupos VIP e tenha suporte prioritário
                    </p>
                    <Button 
                      className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg"
                      onClick={() => setActiveTab('premium')}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Assinar Premium
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PREMIUM TAB */}
          <TabsContent value="premium" className="space-y-6">
            <Card className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-2xl">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Crown className="w-16 h-16" />
                </div>
                <h2 className="text-3xl font-bold mb-2">VivaFit+ Premium</h2>
                <p className="text-white/90 text-lg">
                  Desbloqueie todo o potencial do seu treino
                </p>
              </CardContent>
            </Card>

            {/* Premium Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumPlans.map((plan, idx) => (
                <Card 
                  key={plan.id} 
                  className={`hover:shadow-2xl transition-all hover:scale-105 ${
                    idx === 2 ? 'border-4 border-amber-500 relative' : ''
                  }`}
                >
                  {idx === 2 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 text-sm shadow-lg">
                        ⭐ Mais Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-6">
                      <p className="text-5xl font-bold text-gray-800">
                        R$ {plan.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {plan.duration === 'monthly' && 'por mês'}
                        {plan.duration === 'quarterly' && 'a cada 3 meses'}
                        {plan.duration === 'yearly' && 'por ano'}
                      </p>
                      {idx === 2 && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          Economize 44%
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start gap-3 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full h-12 text-base font-semibold ${
                        idx === 2 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg' 
                          : ''
                      }`}
                      onClick={() => setIsPremium(true)}
                    >
                      Assinar Agora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Premium Features Highlight */}
            <Card>
              <CardHeader>
                <CardTitle>Por que escolher Premium?</CardTitle>
                <CardDescription>Benefícios exclusivos para acelerar seus resultados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Dumbbell className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-1">Treinos Exclusivos</h4>
                      <p className="text-sm text-gray-600">
                        Acesso a mais de 100 treinos personalizados e programas avançados
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Apple className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-1">Nutrição Personalizada</h4>
                      <p className="text-sm text-gray-600">
                        Planos alimentares criados especificamente para seu objetivo
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-1">Relatórios Avançados</h4>
                      <p className="text-sm text-gray-600">
                        Análises detalhadas do seu progresso com gráficos e insights
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base mb-1">Comunidade VIP</h4>
                      <p className="text-sm text-gray-600">
                        Grupo exclusivo com suporte prioritário e desafios especiais
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle>O que nossos membros Premium dizem</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gradient-to-br from-blue-500 to-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Maria Silva</p>
                        <p className="text-xs text-gray-600">Membro Premium há 6 meses</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "O VivaFit+ Premium mudou minha vida! Perdi 12kg e ganhei muita disposição."
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-gradient-to-br from-blue-500 to-green-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                        J
                      </div>
                      <div>
                        <p className="font-semibold text-sm">João Santos</p>
                        <p className="text-xs text-gray-600">Membro Premium há 1 ano</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 italic">
                      "Os treinos personalizados são incríveis! Resultados visíveis em poucas semanas."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 md:hidden shadow-2xl z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeTab === 'home' 
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white scale-105' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs font-medium">Início</span>
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeTab === 'nutrition' 
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white scale-105' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Apple className="w-5 h-5" />
            <span className="text-xs font-medium">Nutrição</span>
          </button>
          <button
            onClick={() => setActiveTab('workouts')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeTab === 'workouts' 
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white scale-105' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Dumbbell className="w-5 h-5" />
            <span className="text-xs font-medium">Treinos</span>
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeTab === 'progress' 
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white scale-105' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-medium">Progresso</span>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
              activeTab === 'community' 
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white scale-105' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">Comunidade</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
