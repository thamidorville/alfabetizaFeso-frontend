<template>
  <div class="pagina-inicial">
    <!-- Call to Action Banner -->
    <div class="banner">
      <img src="/banner.jpg" alt="Banner">
      <div class="banner-text">Seu Futuro começa aqui</div>
      <router-link to="/login" class="banner-login-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" stroke="currentColor" stroke-width="2"/>
          <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2"/>
          <path d="M15 12H3" stroke="currentColor" stroke-width="2"/>
        </svg>
        Fazer Login
      </router-link>
    </div>

    <!-- Role Selection Section -->
    <section class="role-selection">
      <div class="container">
        <h2 class="role-title">Como você quer começar?</h2>
        <div class="role-buttons">
          <router-link to="/cadastro-educador" class="role-btn educador-btn">
            <div class="role-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 14L21 9L12 4L3 9L12 14Z" stroke="currentColor" stroke-width="2"/>
                <path d="M3 9V16C3 16 6 19 12 19S21 16 21 16V9" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Sou Educador</h3>
            <p>Quero ensinar e compartilhar conhecimento</p>
          </router-link>
          
          <router-link to="/cadastro-aluno" class="role-btn aluno-btn">
            <div class="role-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M19 14C19 18.4183 15.4183 22 11 22C6.58172 22 3 18.4183 3 14C3 9.58172 6.58172 6 11 6" stroke="currentColor" stroke-width="2"/>
                <path d="M21 2L13 10L16 13L21 8V2Z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Sou Aluno</h3>
            <p>Quero aprender e me desenvolver</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Por que AlfabetizaFeso?</h2>
          <p class="section-subtitle">Recursos pensados para maximizar o aprendizado</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Aprendizado Estruturado</h3>
            <p>Metodologia comprovada com acompanhamento personalizado para cada aluno</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Flexibilidade Total</h3>
            <p>Estude no seu ritmo, quando e onde quiser, com horários flexíveis</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="2"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
                <path d="M23 21V19C23 17.1362 21.7252 15.5701 20 15.126" stroke="currentColor" stroke-width="2"/>
                <path d="M16 3.12598C17.7252 3.56986 19 5.13616 19 7C19 8.86384 17.7252 10.4301 16 10.874" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3>Comunidade Ativa</h3>
            <p>Conecte-se com educadores experientes e outros alunos em nossa rede</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
:root {
  --color-gradient-start: #2A7E9E;
  --color-gradient-end: #61BB87;
  --color-text-title: #FFFFFF;
  --color-button-bg: #89B385;
  --color-bg-light: #fafbfc;
  --color-bg-gray: #f8f9fa;
  --color-text-dark: #1a1a1a;
  --color-text-gray: #6b7280;
  --color-border: #e5e7eb;
  --transition-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --max-width: 1200px;
}

.pagina-inicial {
  background: var(--color-bg-light);
  min-height: 100vh;
  overflow-x: hidden;
}

.banner {
  position: relative;
  width: 90%;
  max-width: 900px;
  margin: 1.5rem auto 2rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
  z-index: 1;
  pointer-events: none;
}

.banner img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.banner-text {
  position: absolute;
  top: 38%;
  left: 35%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  z-index: 2;
  max-width: 85%;
  white-space: nowrap;
}

.banner-login-btn {
  position: absolute;
  top: 58%;
  left: 35%;
  transform: translateX(-50%);
  z-index: 3;
  background: #89B385;
  color: #FFFFFF;
  padding: 1.375rem 3rem;
  border-radius: 24px;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: 0.01em;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.35s var(--transition-smooth);
  box-shadow: 0 6px 20px rgba(137, 179, 133, 0.4), 0 2px 8px rgba(0, 0, 0, 0.15);
  will-change: transform;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.banner-login-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), transparent);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.banner-login-btn:hover::before {
  opacity: 1;
}

.banner-login-btn:hover {
  transform: translateX(-50%) translateY(-3px) scale(1.02);
  box-shadow: 0 10px 30px rgba(137, 179, 133, 0.5), 0 4px 12px rgba(0, 0, 0, 0.2);
  background: #7FAA7B;
}

.banner-login-btn:active {
  transform: translateX(-50%) translateY(-1px) scale(0.98);
  box-shadow: 0 4px 16px rgba(137, 179, 133, 0.4);
}

.banner-login-btn:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.8);
  outline-offset: 3px;
}

.banner-login-btn svg {
  flex-shrink: 0;
  transition: transform 0.35s var(--transition-smooth);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.banner-login-btn:hover svg {
  transform: translateX(4px);
}

.role-selection {
  padding: clamp(3rem, 8vh, 5rem) 0;
  background: linear-gradient(135deg, var(--color-bg-gray) 0%, #f1f3f4 100%);
}

.role-title {
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text-dark);
  margin-bottom: clamp(2rem, 5vh, 3rem);
  letter-spacing: -0.025em;
}

.role-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 3vw, 2rem);
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.role-btn {
  background: white;
  padding: clamp(2rem, 4vw, 3rem) 1.5rem;
  border-radius: 20px;
  text-decoration: none;
  text-align: center;
  transition: all 0.4s var(--transition-smooth);
  border: 1px solid var(--color-border);
  display: block;
  position: relative;
  overflow: hidden;
  will-change: transform;
}

.role-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(42, 126, 158, 0.05) 0%, rgba(97, 187, 135, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.role-btn:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: var(--color-gradient-end);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(97, 187, 135, 0.2);
}

.role-btn:focus-visible {
  outline: 2px solid var(--color-gradient-end);
  outline-offset: 2px;
}

.role-btn:hover::before {
  opacity: 1;
}

.role-icon {
  width: clamp(64px, 10vw, 80px);
  height: clamp(64px, 10vw, 80px);
  background: linear-gradient(135deg, var(--color-gradient-start) 0%, var(--color-gradient-end) 100%);
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 1.5rem;
  color: var(--color-text-title);
  transition: transform 0.3s ease;
}

.role-btn:hover .role-icon {
  transform: scale(1.1) rotate(5deg);
}

.role-btn h3 {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;
}

.role-btn p {
  color: var(--color-text-gray);
  font-size: clamp(0.9rem, 2vw, 1rem);
  margin: 0;
  line-height: 1.5;
  position: relative;
  z-index: 1;
}

.features-section {
  padding: clamp(4rem, 10vh, 6rem) 0;
  background: white;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
}

.section-header {
  text-align: center;
  margin-bottom: clamp(3rem, 8vh, 4rem);
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--color-text-dark);
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
}

.section-subtitle {
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  color: var(--color-text-gray);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(1.5rem, 4vw, 2rem);
}

.feature-card {
  background: white;
  padding: clamp(1.5rem, 4vw, 2rem);
  border-radius: 16px;
  border: 1px solid var(--color-border);
  transition: all 0.3s var(--transition-smooth);
  will-change: transform;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(97, 187, 135, 0.3);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(42, 126, 158, 0.1) 0%, rgba(97, 187, 135, 0.15) 100%);
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: var(--color-gradient-start);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-card h3 {
  font-size: clamp(1.1rem, 2.5vw, 1.25rem);
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.feature-card p {
  color: var(--color-text-gray);
  line-height: 1.6;
  font-size: clamp(0.875rem, 2vw, 0.95rem);
  margin: 0;
}

@media (max-width: 768px) {
  .banner {
    margin: 0 1rem 1rem;
  }
  
  .banner-login-btn {
    padding: 1.125rem 2.25rem;
    font-size: 1.0625rem;
    border-radius: 20px;
  }
  
  .role-buttons {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .role-btn:hover,
  .feature-card:hover,
  .role-btn:hover .role-icon,
  .feature-card:hover .feature-icon,
  .banner-login-btn:hover {
    transform: none;
  }
}
</style>
