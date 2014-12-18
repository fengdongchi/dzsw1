package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeUnitInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class UnitInfoinsertAction extends ActionSupport{
    private boolean success;
    private String message;
    private TMeUnitInfo unit;
    private List<TMeUnitInfo> list;
    @Resource
    private BaseDAO<TMeUnitInfo> dao;

    public String insert(){
        list=dao.listAll(TMeUnitInfo.class);
        for(TMeUnitInfo u:list){
            if(u.getName().trim().equals(unit.getName().trim())){
                setSuccess(false);
                setMessage("您插入失败！");
            }
        }
        setMessage("插入成功！");
        setSuccess(true);
        dao.insert(unit);
        return SUCCESS;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public TMeUnitInfo getUnit() {
        return unit;
    }

    public void setUnit(TMeUnitInfo unit) {
        this.unit = unit;
    }
}
