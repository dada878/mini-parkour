//defined anything
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject(blocklyDiv,{toolbox: document.getElementById('toolbox')});


function blocks_init(Blockly) {   
  Blockly.Blocks['gametest_getitemid'] = {
    init: function() {
      this.appendValueInput("ITEM")
          .setCheck("Item")
          .appendField("取得物品ID");
      this.setOutput(true, "String");
      this.setColour(50);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['gametest_getitemid'] = function(block) {
    var value_item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC);
    let code = `${value_item}.id`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  
  Blockly.Blocks['gametest_getitemname'] = {
    init: function() {
      this.appendValueInput("ITEM")
          .setCheck("Item")
          .appendField("取得物品名稱");
      this.setOutput(true, "String");
      this.setColour(50);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['gametest_getitemname'] = function(block) {
    var value_item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC);
    let code = `${value_item}.nameTag`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  
  Blockly.Blocks['gametest_onitemuse'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("當玩家使用物品");
      this.appendValueInput("ITEM")
          .setCheck("Item")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("物品");
      this.appendValueInput("PLAYER")
          .setCheck("Player")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("玩家");
      this.appendValueInput("CANCEL")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("是否攔截");
      this.appendStatementInput("DO")
          .setCheck(null);
      this.setColour(50);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['gametest_onitemuse'] = function(block) {
    let value_player = Blockly.JavaScript.valueToCode(block, 'PLAYER', Blockly.JavaScript.ORDER_ATOMIC);
    let value_item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC);
    let value_cancel = Blockly.JavaScript.valueToCode(block, 'CANCEL', Blockly.JavaScript.ORDER_ATOMIC);
    let statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    
    let cancel
  
    if (value_cancel) {
        cancel = "e.cancel = true"
    }
    else {
      cancel = "e.cancel = false"
    }
  
    let code = `
  Minecraft.world.events.beforeItemUse.subscribe(e => {
  ${cancel}
  ${value_item} = e.item;
  ${value_player} = e.source;
  ${statements_do}
  });
    `;
    return code;
    };

  Blockly.Blocks['gametest_getplayername'] = {
      init: function() {
      this.appendValueInput("PLAYER")
          .setCheck("Player")
          .appendField("取得玩家名稱");
      this.setOutput(true, "String");
      this.setColour(50);
  this.setTooltip("");
  this.setHelpUrl("");
      }
  };
  
  Blockly.Blocks['gametest_getplayerpos'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["X座標","location.x"], ["Y座標","location.y"], ["Z座標","location.z"]]), "POS");
      this.appendValueInput("PLAYER")
          .setCheck("Player")
          .appendField("取得玩家座標");
      this.setOutput(true, "Number");
      this.setColour(50);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  Blockly.JavaScript['gametest_getplayername'] = function(block) {
    let value_player = Blockly.JavaScript.valueToCode(block, 'PLAYER', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    let code = `${value_player}.nameTag`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  
  Blockly.JavaScript['gametest_getplayerpos'] = function(block) {
    let dropdown_pos = block.getFieldValue('POS');
    let value_player = Blockly.JavaScript.valueToCode(block, 'PLAYER', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    let code = `${value_player}.${dropdown_pos}`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.Blocks['onchat'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("當玩家傳送訊息");
      this.appendValueInput("PLAYER")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("玩家");
      this.appendValueInput("MESSAGE")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("訊息");
      this.appendValueInput("CANCEL")
          .setCheck("Boolean")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("是否攔截");
      this.appendStatementInput("DO")
          .setCheck(null);
      this.setColour(50);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  
  Blockly.JavaScript['onchat'] = function(block) {
    let value_player = Blockly.JavaScript.valueToCode(block, 'PLAYER', Blockly.JavaScript.ORDER_ATOMIC);
    let value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
    let value_cancel = Blockly.JavaScript.valueToCode(block, 'CANCEL', Blockly.JavaScript.ORDER_ATOMIC);
    let statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
      
    let cancel

      if (value_cancel) {
          cancel = "e.cancel = true"
      }
      else {
        cancel = "e.cancel = false"
      }
  
      let code = `
Minecraft.world.events.beforeChat.subscribe(e => {
  ${cancel}
  ${value_player} = e.sender;
  ${value_message} = e.message;
  ${statements_do}
});
      `;
      return code;
      };
  
  //執行指令
  Blockly.Blocks['gametest_run_command'] = {
      init: function() {
          this.appendValueInput("COMMAND")
              .setCheck("String")
              .appendField("執行指令在")
              .appendField(new Blockly.FieldDropdown([["主世界","overworld"], ["地獄","nether"], ["終界","the end"]]), "DIMENSION");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(50);
      this.setTooltip("");
      this.setHelpUrl("");
  }
  };
  Blockly.JavaScript['gametest_run_command'] = function(block) {
      let dropdown_dimension = block.getFieldValue('DIMENSION');
      let value_command = Blockly.JavaScript.valueToCode(block, 'COMMAND', Blockly.JavaScript.ORDER_ATOMIC);
      // TODO: Assemble JavaScript into code variable.
      let code = `Minecraft.world.getDimension("${dropdown_dimension}").runCommand(${value_command});\n`;
      return code;
  };
}

//loading blocks
blocks_init(Blockly)

//workspace
var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);


