function blocks_init(Blockly) {    
    Blockly.Blocks['gametest_getplayername'] = {
        init: function() {
        this.appendValueInput("PLAYER")
            .setCheck("Player")
            .appendField("取得玩家名稱");
        this.setOutput(true, "String");
        this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
        }
    };
    
    Blockly.Blocks['gametest_getplayerpos'] = {
        init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["X座標","OPTIONNAME"], ["Y座標","OPTIONNAME"], ["Z座標","OPTIONNAME"]]), "POS");
        this.appendValueInput("PLAYER")
            .setCheck("Player")
            .appendField("取得玩家座標");
        this.setOutput(true, "Number");
        this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
        }
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
        this.appendStatementInput("DO")
            .setCheck(null);
        this.setColour(50);
    this.setTooltip("");
    this.setHelpUrl("");
        }
    };
    
    Blockly.JavaScript['onchat'] = function(block) {
        var value_player = Blockly.JavaScript.valueToCode(block, 'PLAYER', Blockly.JavaScript.ORDER_ATOMIC);
        var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
        var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
        // TODO: Assemble JavaScript into code variable.
    
        value_message = "hello"
    
        var code = `Minecraft.world.events.beforeChat.subscribe(eventData => {\n${statements_do}\n});\n`;
        return code;
        };
    
    //執行指令方塊
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
        var dropdown_dimension = block.getFieldValue('DIMENSION');
        var value_command = Blockly.JavaScript.valueToCode(block, 'COMMAND', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = `Minecraft.world.getDimension("${dropdown_dimension}").runCommand(${value_command});\n`;
        return code;
    };
}

export {blocks_init}