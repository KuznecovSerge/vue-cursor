import bbcode from "./plugins/bbcode";

/**
 * * Провайдер Tiny-плагинов
 */
const PluginProvider = () => {
  /**
   * * Список плагинов
   */
  const plugins = function() {
    return [bbcode];
  };

  /**
   * * Array имен плагинов
   */
  const pluginNames = function() {
    const _p = plugins();
    if (_p.length) {
      return _p.map(i => i.name);
    }
    return [];
  };

  /**
   * * Наименование плагинов
   */
  const pluginNamesString = function() {
    const _n = pluginNames();
    if (!!_n) {
      return _n.join(" ");
    }
    return "";
  };

  /**
   * * Валидация плагинов
   * * Проверка наличия метода onLoad который вызывается после загрузки
   * @param {*} plugins
   */
  const validate = function(plugins) {
    const prefix = `должен реализовать `;
    plugins.forEach(p => {
      if (!p.onLoad) {
        throw new Error(
          `${p} ${prefix} метод onLoad для инициализации плагина`
        );
      }

      if (!p.name) {
        throw new Error(
          `${p} ${prefix} свойство 'name' с именем плагина для загрузки`
        );
      }
    });
  };

  /**
   * * Инициализация
   * @param {*} tiny
   */
  const init = function(tiny) {
    this.tiny = tiny;
    this.manager = tiny.PluginManager;
    if (this.manager) {
      const _p = plugins();
      validate(_p);
      if (_p.length) {
        _p.forEach(p => this.manager.add(p.name, p.onLoad));
      }
    }
  };

  /**
   * * Contract
   */
  return {
    pluginActions: {
      total: plugins,
      pluginNames,
      pluginNamesString
    },
    init: init
  };
};

export default PluginProvider;
