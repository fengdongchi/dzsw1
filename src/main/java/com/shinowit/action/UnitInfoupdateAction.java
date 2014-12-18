package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class UnitInfoupdateAction extends ActionSupport{
    private boolean success;
    private String message;
    private List<TMeUnitInfo> unitlist;
    private TMeUnitInfo unit;
    @Resource
    private BaseDAO<TMeUnitInfo> dao;

    public String update(){
        unitlist=dao.myfindByHql("from TMeUnitInfo where name=?",unit.getName());
        if(unitlist.size()>0){
            setMessage("更新失败，请重新更改");
            setSuccess(false);
            return SUCCESS;
        }
        dao.update(unit);
        setMessage("更新成功！");
        setSuccess(true);
        return SUCCESS;
    }

    public TMeUnitInfo getUnit() {
        return unit;
    }

    public void setUnit(TMeUnitInfo unit) {
        this.unit = unit;
    }

    public List<TMeUnitInfo> getUnitlist() {
        return unitlist;
    }

    public void setUnitlist(List<TMeUnitInfo> unitlist) {
        this.unitlist = unitlist;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

}
