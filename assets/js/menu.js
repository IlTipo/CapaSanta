/* Capasanta in Piazzetta — il menu.
 *
 * Struttura di un piatto:
 *   { p:'15', n:'La caprese', d:{ it:'…', en:'…', fr:'…' } }
 *     p  prezzo in euro          n  nome (resta in italiano, come sul menu stampato)
 *     d  descrizione tradotta    v  varianti, quando un piatto ha piu' versioni
 *
 * Per i vini il prezzo e' doppio — g = al calice, b = alla bottiglia — e la
 * descrizione (vitigno e zona) e' una stringa unica: sono nomi propri e
 * varieta', non si traducono.
 *
 * `when` marca le due carte a orario: 'pre18' fino alle 18, 'post18' dopo.
 * L'orario di cambio e' SWITCH_HOUR in main.js.
 */
window.CAPASANTA_MENU = {

  cucina: [
    {
      id: 'freddi', when: 'pre18',
      t: { it: 'Gli immancabili freddi', en: 'Our signature cold cuts', fr: 'Nos incontournables froids' },
      items: [
        { p: '15', n: 'La caprese', d: {
          it: 'Mozzarella di bufala, pomodoro datterino e basilico',
          en: 'Buffalo mozzarella with datterino tomato and basil',
          fr: 'Mozzarella de bufflonne, tomate datterino et basilic' } },
        { p: '17', n: 'Prosciutto e melone', d: {
          it: 'Prosciutto crudo di Parma stagionato 24 mesi, melone e menta',
          en: '24 month aged Parma prosciutto with melon and mint',
          fr: 'Jambon de Parme affiné 24 mois, melon et menthe' } },
        { p: '20', n: 'Insalata Paraggi', d: {
          it: 'Polpo, insalata misticanza, pomodori secchi, zeste di Limone di Portofino',
          en: 'Octopus with mixed salad greens, sun-dried tomatoes and Portofino lemon zest',
          fr: 'Poulpe, mesclun, tomates séchées et zestes de citron de Portofino' } },
        { p: '20', n: 'Insalata Portofino', d: {
          it: 'Tartare di tonno fresco, insalata misticanza, pomodorino datterino, spicchi di arancia e finocchi',
          en: 'Tuna tartare, mixed salad greens, datterino tomatoes, orange segments and fennel',
          fr: 'Tartare de thon frais, mesclun, tomates datterino, quartiers d\'orange et fenouil' } },
        { p: '18', n: 'Insalata Santa Margherita', d: {
          it: 'Feta, insalata misticanza, pomodorino datterino, olive, cipolla rossa, basilico',
          en: 'Feta, mixed salad greens, datterino tomatoes, olives, red onion and basil',
          fr: 'Feta, mesclun, tomates datterino, olives, oignon rouge et basilic' } }
      ]
    },
    {
      id: 'special', when: 'post18',
      t: { it: 'I nostri special', en: 'Our signature specials', fr: 'Nos spécialités' },
      items: [
        { p: '23', n: 'La ceviche', d: {
          it: 'Ceviche di orata, sedano, lamponi e lime',
          en: 'Sea bream ceviche with celery, raspberries and lime',
          fr: 'Ceviche de daurade, céleri, framboises et citron vert' } },
        { p: '24', n: 'I tagliolini', d: {
          it: 'Tagliolino di pasta fresca, con gamberi di Santa Margherita Ligure e crema di zucchine',
          en: 'Fresh tagliolini pasta with Santa Margherita Ligure prawns and zucchini cream',
          fr: 'Tagliolini frais aux crevettes de Santa Margherita Ligure et crème de courgettes' } },
        { p: '10/12 <small>all\'etto</small>', n: 'Il pescato', d: {
          it: 'Il pescato del giorno al forno con patate, spinacino fresco e verdure. Il pescato potrà variare a seconda della disponibilità.',
          en: 'Oven-baked catch of the day served with potatoes, baby spinach and seasonal vegetables. The fish varies depending on availability.',
          fr: 'La pêche du jour au four avec pommes de terre, jeunes épinards et légumes. Le poisson varie selon les arrivages.' } }
      ]
    },
    {
      id: 'cominciare',
      t: { it: 'Per cominciare', en: 'To start', fr: 'Pour commencer' },
      items: [
        { p: '20', n: 'Le acciughe', d: {
          it: 'Acciughe del Cantabrico "Rosalita" con crostini di focaccia ligure e burro montato',
          en: 'Cantabrian "Rosalita" anchovies with Ligurian focaccia croutons and whipped butter',
          fr: 'Anchois de Cantabrie « Rosalita », croûtons de focaccia ligure et beurre monté' } },
        { p: '22', n: 'Le cozze', d: {
          it: 'Sautè di cozze alla marinara con crostini di focaccia ligure e zeste di limone di Portofino',
          en: 'Sautéed mussels marinara with Ligurian focaccia croutons and Portofino lemon zest',
          fr: 'Moules marinière sautées, croûtons de focaccia ligure et zestes de citron de Portofino' } },
        { p: '24', n: 'I gamberi', d: {
          it: 'Carpaccio di gamberi viola, insalatina di finocchi, citronette agli agrumi',
          en: 'Purple prawn carpaccio, fennel salad, citrus dressing',
          fr: 'Carpaccio de crevettes violettes, salade de fenouil, vinaigrette aux agrumes' } }
      ]
    },
    {
      id: 'tartare',
      t: { it: 'Le nostre tartare', en: 'Our tartares', fr: 'Nos tartares' },
      items: [
        { p: '24', n: 'Il tonno', d: {
          it: 'Tartare di tonno alla mediterranea, con capperi, pomodori secchi, olive taggiasche',
          en: 'Mediterranean tuna tartare with capers, sun-dried tomatoes and taggiasca olives',
          fr: 'Tartare de thon à la méditerranéenne, câpres, tomates séchées et olives taggiasca' } },
        { p: '24', n: 'La ricciola', d: {
          it: 'Tartare di ricciola, gazpacho di datterino giallo, olio al basilico',
          en: 'Amberjack tartare, yellow datterino gazpacho, basil oil',
          fr: 'Tartare de sériole, gaspacho de datterino jaune, huile au basilic' } }
      ]
    },
    {
      id: 'primi',
      t: { it: 'I primi', en: 'First courses', fr: 'Les pâtes' },
      items: [
        { p: '20', n: 'Le trofie', d: {
          it: 'Trofiette al pesto genovese',
          en: 'Trofiette with Genoese pesto',
          fr: 'Trofiette au pesto génois' } },
        { n: 'Gli gnocchetti', v: [
          { p: '25', d: {
            it: 'Gnocchetti di patate con gamberi di Santa Margherita, crema di pomodorino datterino e basilico',
            en: 'Potato gnocchetti with Santa Margherita prawns, datterino tomato cream and basil',
            fr: 'Gnocchetti de pommes de terre, crevettes de Santa Margherita, crème de tomate datterino et basilic' } },
          { p: '25', d: {
            it: 'Gnocchetti di patate con ragù di branzino, zucchine trombetta, bottarga e peperoncino',
            en: 'Potato gnocchetti with sea bass ragù, trombetta courgette, bottarga and chilli',
            fr: 'Gnocchetti de pommes de terre, ragoût de bar, courgette trombetta, poutargue et piment' } }
        ] },
        { n: 'I paccheri', v: [
          { p: '18', d: {
            it: 'Paccheri con crema di pomodorini datterino e basilico',
            en: 'Paccheri with datterino tomato cream and basil',
            fr: 'Paccheri à la crème de tomates datterino et basilic' } },
          { p: '20', d: {
            it: 'Paccheri con crema di pomodorini datterino e pesto genovese',
            en: 'Paccheri with datterino tomato cream and Genoese pesto',
            fr: 'Paccheri à la crème de tomates datterino et pesto génois' } }
        ] },
        { p: '24', n: 'Gli spaghetti', d: {
          it: 'Spaghetti mantecati alle vongole veraci, zeste di limone di Portofino',
          en: 'Spaghetti with clams and Portofino lemon zest',
          fr: 'Spaghetti aux palourdes et zestes de citron de Portofino' } }
      ]
    },
    {
      id: 'secondi',
      t: { it: 'I secondi', en: 'Main courses', fr: 'Les plats' },
      items: [
        { p: '24', n: 'Il polpo', d: {
          it: 'Tentacolo di polpo alla brace con Pak-Choi e salsa salmoriglio',
          en: 'Chargrilled octopus tentacle with pak choi and salmoriglio sauce',
          fr: 'Tentacule de poulpe grillé, pak-choï et sauce salmoriglio' } },
        { p: '40', n: 'I crostacei', d: {
          it: 'Gamberi e scampi alla griglia',
          en: 'Grilled prawns and langoustines',
          fr: 'Crevettes et langoustines grillées' } },
        { p: '30', n: 'Il pesce', d: {
          it: 'Filetto di pescato alla ligure con patate, pomodorini, olive taggiasche e pinoli',
          en: 'Ligurian-style fillet of the day\'s catch with potatoes, tomatoes, taggiasca olives and pine nuts',
          fr: 'Filet de la pêche du jour à la ligure, pommes de terre, tomates, olives taggiasca et pignons' } },
        { p: '28', n: 'La carne', d: {
          it: 'Tagliata di manzo alla brace con verdure di stagione',
          en: 'Chargrilled sliced beef with seasonal vegetables',
          fr: 'Tagliata de bœuf grillée et légumes de saison' } },
        { p: '26', n: 'Il tonno', d: {
          it: 'Scottata di tonno con wok di verdure di stagione',
          en: 'Seared tuna with wok-fried seasonal vegetables',
          fr: 'Thon snacké et légumes de saison au wok' } },
        { p: '28', n: 'Il pesce ai ferri', d: {
          it: 'Trancio di pescato del giorno ai ferri con patate',
          en: 'Grilled steak of the day\'s catch with potatoes',
          fr: 'Darne de la pêche du jour grillée, pommes de terre' } },
        { n: 'Le catalane', v: [
          { p: '25', d: {
            it: 'Catalana di polpo con pomodori datterino, cipolla rossa, olive taggiasche, capperi e basilico',
            en: 'Octopus catalana with datterino tomatoes, red onion, taggiasca olives, capers and basil',
            fr: 'Catalane de poulpe, tomates datterino, oignon rouge, olives taggiasca, câpres et basilic' } },
          { p: '28', d: {
            it: 'Catalana di scampi con pomodori datterino, cipolla rossa, olive taggiasche, capperi e basilico',
            en: 'Langoustine catalana with datterino tomatoes, red onion, taggiasca olives, capers and basil',
            fr: 'Catalane de langoustines, tomates datterino, oignon rouge, olives taggiasca, câpres et basilic' } },
          { p: '28', d: {
            it: 'Catalana di gamberi con pomodori datterino, cipolla rossa, olive taggiasche, capperi e basilico',
            en: 'Prawn catalana with datterino tomatoes, red onion, taggiasca olives, capers and basil',
            fr: 'Catalane de crevettes, tomates datterino, oignon rouge, olives taggiasca, câpres et basilic' } }
        ] }
      ]
    },
    {
      id: 'fritture',
      t: { it: 'Le nostre fritture', en: 'Our fried dishes', fr: 'Nos fritures' },
      items: [
        { p: '28', n: 'La frittura Capasanta', d: {
          it: 'Frittura di gamberi, scampi, acciughe, calamari e verdure',
          en: 'Fried prawns, langoustines, anchovies, squid and vegetables',
          fr: 'Friture de crevettes, langoustines, anchois, calamars et légumes' } },
        { p: '26', n: 'I calamari', d: {
          it: 'Frittura di calamari', en: 'Fried squid', fr: 'Friture de calamars' } },
        { p: '26', n: 'Le acciughe fritte', d: {
          it: 'Frittura di acciughe impanate', en: 'Breaded fried anchovies', fr: 'Anchois panés frits' } },
        { p: '38', n: 'I crostacei', d: {
          it: 'Frittura di scampi e gamberi', en: 'Fried langoustines and prawns', fr: 'Friture de langoustines et crevettes' } },
        { p: '15', n: 'La panissa', d: {
          it: 'Frittura di panissette', en: 'Fried chickpea panissette', fr: 'Panissettes frites (pois chiches)' } },
        { p: '15', n: 'Le verdure', d: {
          it: 'Fritto di verdure dell\'orto', en: 'Fried garden vegetables', fr: 'Friture de légumes du potager' } }
      ]
    },
    {
      id: 'pizza',
      t: { it: 'Pizza', en: 'Pizza', fr: 'Pizza' },
      note: { it: 'Varianti + 2,50 €', en: 'Extra toppings + €2.50', fr: 'Suppléments + 2,50 €' },
      items: [
        { p: '12', n: 'Margherita', d: {
          it: 'Pomodoro bio, mozzarella fiordilatte, basilico',
          en: 'Organic tomato, fiordilatte mozzarella, basil',
          fr: 'Tomate bio, mozzarella fiordilatte, basilic' } },
        { p: '20', n: 'Capasanta', d: {
          it: 'Stracciatella, gambero viola di Santa Margherita, pomodorino datterino, olio extravergine, basilico',
          en: 'Stracciatella, Santa Margherita purple prawn, datterino tomato, extra virgin olive oil, basil',
          fr: 'Stracciatella, crevette violette de Santa Margherita, tomate datterino, huile d\'olive vierge extra, basilic' } },
        { p: '15', n: 'Bufala', d: {
          it: 'Pomodoro bio, mozzarella di bufala, basilico',
          en: 'Organic tomato, buffalo mozzarella, basil',
          fr: 'Tomate bio, mozzarella de bufflonne, basilic' } },
        { p: '12', n: 'Marinara', d: {
          it: 'Pomodoro bio, aglio, olio, origano',
          en: 'Organic tomato, garlic, oil, oregano',
          fr: 'Tomate bio, ail, huile, origan' } },
        { p: '16', n: 'Crudo', d: {
          it: 'Pomodoro bio, stracchino, crudo di Parma',
          en: 'Organic tomato, stracchino, Parma ham',
          fr: 'Tomate bio, stracchino, jambon de Parme' } },
        { p: '17', n: 'Portofino', d: {
          it: 'Pomodoro bio, stracchino, pesto',
          en: 'Organic tomato, stracchino, pesto',
          fr: 'Tomate bio, stracchino, pesto' } },
        { p: '14', n: 'Napoli', d: {
          it: 'Pomodoro bio, mozzarella fiordilatte, acciughe, capperi',
          en: 'Organic tomato, fiordilatte mozzarella, anchovies, capers',
          fr: 'Tomate bio, mozzarella fiordilatte, anchois, câpres' } },
        { p: '17', n: 'Capricciosa', d: {
          it: 'Pomodoro bio, mozzarella fiordilatte, prosciutto cotto Pernigotti, funghi e carciofi sott\'olio',
          en: 'Organic tomato, fiordilatte mozzarella, Pernigotti cooked ham, mushrooms and artichokes in oil',
          fr: 'Tomate bio, mozzarella fiordilatte, jambon cuit Pernigotti, champignons et artichauts à l\'huile' } },
        { p: '16', n: 'La vegetariana', d: {
          it: 'Pomodoro bio e verdure grigliate, pomodorini',
          en: 'Organic tomato, grilled vegetables, cherry tomatoes',
          fr: 'Tomate bio, légumes grillés, tomates cerises' } },
        { p: '16', n: 'Diavola', d: {
          it: 'Pomodoro bio, mozzarella fiordilatte e salamino piccante',
          en: 'Organic tomato, fiordilatte mozzarella and spicy salami',
          fr: 'Tomate bio, mozzarella fiordilatte et salami piquant' } },
        { p: '15', n: 'Cotto', d: {
          it: 'Pomodoro bio, mozzarella fiordilatte e prosciutto cotto Pernigotti',
          en: 'Organic tomato, fiordilatte mozzarella and Pernigotti cooked ham',
          fr: 'Tomate bio, mozzarella fiordilatte et jambon cuit Pernigotti' } },
        { p: '17', n: 'Nero cremoso', d: {
          it: 'Pomodoro bio, mozzarella fiordilatte, gorgonzola, salame piccante, cipolla caramellata e crema di aglio nero',
          en: 'Organic tomato, fiordilatte mozzarella, gorgonzola, spicy salami, caramelised onion and black garlic cream',
          fr: 'Tomate bio, mozzarella fiordilatte, gorgonzola, salami piquant, oignon caramélisé et crème d\'ail noir' } },
        { p: '15', n: 'Funghi', d: {
          it: 'Pomodoro bio, mozzarella fiordilatte e funghi',
          en: 'Organic tomato, fiordilatte mozzarella and mushrooms',
          fr: 'Tomate bio, mozzarella fiordilatte et champignons' } }
      ]
    },
    {
      id: 'contorni',
      t: { it: 'I contorni', en: 'Sides', fr: 'Les accompagnements' },
      items: [
        { p: '10', n: 'Gli spinaci', d: {
          it: 'Spinacio novello saltato', en: 'Sautéed baby spinach', fr: 'Jeunes épinards sautés' } },
        { p: '9', n: 'Le fritte', d: {
          it: 'Patate rustiche fritte', en: 'Rustic fried potatoes', fr: 'Pommes de terre rustiques frites' } },
        { n: 'Le verdure', v: [
          { p: '12', d: { it: 'Verdure grigliate miste', en: 'Mixed grilled vegetables', fr: 'Légumes grillés mélangés' } },
          { p: '12', d: { it: 'Sautè di verdure di stagione', en: 'Sautéed seasonal vegetables', fr: 'Légumes de saison sautés' } }
        ] }
      ]
    },
    {
      id: 'dolci',
      t: { it: 'I dolci', en: 'Desserts', fr: 'Les desserts' },
      items: [
        { p: '10', n: 'La tartelletta', d: {
          it: 'Tartelletta, cioccolato "Valrhona" al latte e lampone',
          en: 'Tartlet with Valrhona milk chocolate and raspberry',
          fr: 'Tartelette, chocolat au lait « Valrhona » et framboise' } },
        { p: '10', n: 'La torta di mele', d: {
          it: 'Torta di mele servita con gelato alla crema',
          en: 'Apple tart served with vanilla-cream gelato',
          fr: 'Tarte aux pommes servie avec glace à la crème' } },
        { p: '8', n: 'Il sorbetto', d: {
          it: 'Sorbetto arancia e menta', en: 'Orange and mint sorbet', fr: 'Sorbet orange et menthe' } },
        { p: '10', n: 'Il tiramisù', d: {
          it: 'Tiramisù Capasanta', en: 'Capasanta tiramisù', fr: 'Tiramisù Capasanta' } },
        { p: '10', n: 'La cheesecake', d: {
          it: 'Cheesecake ai frutti rossi', en: 'Red berry cheesecake', fr: 'Cheesecake aux fruits rouges' } },
        { p: '8', n: 'Il gelato', d: {
          it: 'Gelato artigianale alla crema', en: 'Artisan vanilla-cream gelato', fr: 'Glace artisanale à la crème' } },
        { n: 'Le fragole', v: [
          { p: '10', d: { it: 'Insalata di fragole', en: 'Strawberry salad', fr: 'Salade de fraises' } },
          { p: '12', d: { it: 'Fragole con gelato alla crema', en: 'Strawberries with vanilla-cream gelato', fr: 'Fraises avec glace à la crème' } },
          { p: '12', d: { it: 'Fragole con panna montata', en: 'Strawberries with whipped cream', fr: 'Fraises à la chantilly' } }
        ] }
      ]
    },
    {
      id: 'bevande',
      t: { it: 'Bevande', en: 'Drinks', fr: 'Boissons' },
      items: [
        { p: '6',  n: 'Acqua S. Pellegrino – Panna 0,75' },
        { p: '8',  n: 'Bibite 33 cl.', d: {
          it: 'Coca cola, coca zero, fanta, sprite, the freddo',
          en: 'Coca-Cola, Coke Zero, Fanta, Sprite, iced tea',
          fr: 'Coca-Cola, Coca Zero, Fanta, Sprite, thé glacé' } },
        { p: '10', n: 'Limonata di Portofino', d: 'Az. Agricola La Portofinese' },
        { p: '8',  n: 'Succhi di frutta', d: { it: 'Succhi di frutta', en: 'Fruit juices', fr: 'Jus de fruits' } },
        { p: '8',  n: 'Birra analcolica in bottiglia 33 cl.' },
        { p: '9',  n: 'Birre in bottiglia 33 cl.' },
        { p: '12', n: 'Birra artigianale in bottiglia 33 cl.', d: 'Az. Agricola La Portofinese' },
        { p: '9',  n: 'Amari nazionali – Grappe' },
        { p: '15', n: 'Cocktail classici' },
        { p: '18', n: 'Cocktail premium' }
      ]
    },
    {
      id: 'caffetteria',
      t: { it: 'Caffetteria', en: 'Coffee', fr: 'Cafés' },
      items: [
        { p: '3',   n: 'Espresso' },
        { p: '3,5', n: 'Caffè decaffeinato' },
        { p: '5',   n: 'Espresso doppio' },
        { p: '5',   n: 'Caffè americano' },
        { p: '5',   n: 'Cappuccino' },
        { p: '6',   n: 'Selezione the e infusi' }
      ]
    }
  ],

  cantina: [
    {
      id: 'bollicine', wine: true,
      t: { it: 'Bollicine', en: 'Sparkling', fr: 'Bulles' },
      items: [
        { b: '175', n: 'Ruinart Blanc de Blanc', d: 'Chardonnay 100% · Champagne, Francia' },
        { b: '105', n: 'Laurent Perrier Brut', d: 'Chardonnay 50%, Pinot Noir 35%, Pinot Meunier 15% · Francia' },
        { b: '140', n: 'Laurent Perrier Rosè', d: 'Pinot Noir · Champagne, Francia' },
        { b: '68',  n: 'Franciacorta Cuvée Prestige Extra Brut Ca\' del Bosco', d: 'Chardonnay 79,5%, Pinot Nero 19%, Pinot Bianco 1,5% · Franciacorta' },
        { g: '12', b: '40', n: 'Franciacorta Contadi Gastaldi Brut', d: 'Chardonnay 80%, Pinot Bianco 10%, Pinot Nero 10% · Franciacorta' },
        { g: '12', b: '45', n: 'Franciacorta Contadi Gastaldi Rosé', d: 'Chardonnay 65%, Pinot Nero 35% · Franciacorta' },
        { g: '10', b: '30', n: 'Prosecco Superiore di Valdobbiadene Brut Rive di Refrantolo', d: 'Glera 100% · Veneto' },
        { b: '75',  n: 'Franciacorta Bellavista Extra Brut Alma', d: 'Chardonnay 86%, Pinot Nero 13%, Pinot Bianco 1% · Franciacorta' },
        { b: '420', n: 'Champagne Dom Pérignon Vintage', d: 'Pinot Nero e Chardonnay · Francia' }
      ]
    },
    {
      id: 'bianchi', wine: true,
      t: { it: 'Vini bianchi', en: 'White wines', fr: 'Vins blancs' },
      items: [
        { b: '80',  n: 'Sauvignon Ronco d. Mele Doc Collio Venica e Venica', d: 'Sauvignon 100% · Friuli Venezia Giulia' },
        { b: '48',  n: 'Sauvignon Jermann', d: 'Sauvignon 100% · Friuli Venezia Giulia' },
        { b: '38',  n: 'Ribolla Gialla Maria Schioppetto', d: 'Ribolla Gialla · Friuli Venezia Giulia' },
        { b: '38',  n: 'Shàris Livio Felluga', d: 'Chardonnay, Ribolla Gialla · Friuli Venezia Giulia' },
        { b: '40',  n: 'Chardonnay Lis Neris', d: 'Chardonnay 100% · Friuli Venezia Giulia' },
        { b: '38',  n: 'Pigato Bio Vio', d: 'Pigato 100% · Liguria' },
        { b: '44',  n: 'Arneis Langhe Blangé Bio Ceretto', d: 'Arneis 100% · Piemonte' },
        { g: '10', b: '35', n: 'Gewürztraminer Aime Girlan', d: 'Gewürztraminer 100% · Alto Adige' },
        { g: '10', b: '30', n: 'Vermentino Colli di Luni – Az. Agricola La Colombiera', d: 'Vermentino 100% · Liguria' },
        { b: '65',  n: 'Vermentino Ü Portufin – Az. Agricola La Portofinese', d: 'Vermentino 100% · Liguria, Portofino' },
        { b: '45',  n: 'Vermentino Colli di Luni – Az. Agricola Podere Lavandaro', d: 'Vermentino 100% · Liguria, Portofino' },
        { b: '52',  n: 'Etna Bianco Sul Vulcano Donnafugata', d: 'Carricante 100% · Sicilia' },
        { b: '152', n: 'Terre Alte Rosazzo Livio Felluga', d: 'Sauvignon 40%, Pinot Bianco 30%, Friulano 30% · Friuli Venezia Giulia' },
        { b: '115', n: 'Vintage Tunina Jermann', d: 'Sauvignon Blanc, Chardonnay, Ribolla Gialla, Malvasia Istriana e Picolit · Friuli Venezia Giulia' },
        { b: '56',  n: 'Picol Sauvignon Lis Neris', d: 'Sauvignon 100% · Friuli Venezia Giulia' },
        { g: '10', b: '28', n: 'Pinot Grigio – Az. Agricola Mosole', d: 'Pinot Grigio 100% · Veneto' }
      ]
    },
    {
      id: 'rosati', wine: true,
      t: { it: 'Vini rosati', en: 'Rosé wines', fr: 'Vins rosés' },
      items: [
        { b: '50', n: 'Côtes de Provence Rosè Château Minuty', d: 'Cinsault, Syrah · Provenza, Francia' },
        { b: '35', n: 'Pinot Nero Rosato Fallwind St. Michael Eppan', d: 'Pinot Nero 100% · Alto Adige' },
        { b: '64', n: 'Rosa Dolce e Gabbana Donnafugata', d: 'Nerello Mascalese, Nocera · Sicilia' }
      ]
    },
    {
      id: 'rossi', wine: true,
      t: { it: 'Vini rossi', en: 'Red wines', fr: 'Vins rouges' },
      items: [
        { b: '40', n: 'Red Angel Venezia Giulia Jermann', d: 'Pinot Nero 100% · Friuli Venezia Giulia' },
        { b: '40', n: 'Vertigo Livio Felluga', d: 'Merlot 60%, Cabernet Sauvignon 40% · Friuli Venezia Giulia' },
        { b: '52', n: 'Pinot Nero Franz Haas', d: 'Pinot Nero 100% · Alto Adige' },
        { g: '10', b: '32', n: 'Fichi Mori Tormaresca', d: 'Negroamaro 100% · Puglia' },
        { g: '10', b: '35', n: 'Rossese Riviera dei Fiori Bio', d: 'Rossese 100% · Liguria' },
        { b: '54', n: 'Le Volte dell\'Ornellaia – Tenuta Ornellaia', d: 'Merlot 70%, Sangiovese 15%, Cabernet Sauvignon 15% · Toscana' },
        { b: '65', n: 'Barolo Caviot Ca\' Viola', d: 'Nebbiolo 100% · Piemonte' },
        { g: '10', b: '34', n: 'Chianti Rufina Riserva Nipozzano Frescobaldi', d: 'Sangiovese 90%, Malvasia Nera, Colorino, Merlot, Cabernet Sauvignon 10% · Toscana' },
        { g: '10', b: '36', n: 'Vermentino Nero Gemma Zangani', d: 'Vermentino Nero 100% · Liguria' },
        { b: '58', n: 'Corte del Lupo Rosso Ca\' del Bosco', d: 'Cabernet Franc, Cabernet Sauvignon, Carmenère, Merlot · Lombardia' },
        { b: '65', n: 'Tancredi Donnafugata', d: 'Nero d\'Avola, Cabernet Sauvignon, Tannat · Sicilia' }
      ]
    },
    {
      id: 'dolci-vini', wine: true,
      t: { it: 'Vini dolci', en: 'Dessert wines', fr: 'Vins doux' },
      items: [
        { g: '12', n: 'Sciacchetrà La Polenza Cinque Terre', d: 'Bosco 80%, Albarola 10%, Vermentino 10% · Liguria' },
        { g: '10', n: 'Passito di Pantelleria Ben Ryé Donnafugata', d: 'Zibibbo 100% · Sicilia' },
        { g: '10', b: '32', n: 'Moscato d\'Asti Sori Gala – Az. Agricola F. Ferrero', d: 'Moscato · Piemonte' }
      ]
    }
  ],

  coperto: '4'
};
